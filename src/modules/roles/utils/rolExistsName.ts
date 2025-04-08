import { PrismaClient } from '@prisma/client';

export async function roleExistsByName(prisma: PrismaClient, name: string): Promise<boolean> {
    const role = await prisma.role.findUnique({
        where: {
            name,
        },
    });
    return !!role;
}