import Joi from "joi";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";

const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  oldPassword: Joi.string().optional(),
  newPassword: Joi.string().min(6).optional()
}).with('newPassword', 'oldPassword'); 

export async function updateProfile(userId, body) {
  const { error, value } = updateProfileSchema.validate(body);
  if (error) return { error: error.details[0].message };

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { error: "User not found" };

  const updateData = {};
  if (value.name) updateData.name = value.name;

  if (value.newPassword) {
    if (!user.password) return { error: "User has no password set (OAuth user?)" };
    
    const ok = await bcrypt.compare(value.oldPassword, user.password);
    if (!ok) return { error: "Invalid old password" };

    updateData.password = await bcrypt.hash(value.newPassword, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData
  });

  return { user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name } };
}

export async function deleteProfile(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { error: "User not found" };


  await prisma.$transaction([
    prisma.plan.deleteMany({ where: { userId } }),
    prisma.note.deleteMany({ where: { userId } }),
    prisma.miniProject.deleteMany({ where: { userId } }),
    prisma.challenge.deleteMany({ where: { userId } }),
    prisma.companyQuestion.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } })
  ]);

  return { success: true };
}
