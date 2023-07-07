import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { actionPlanValidationSchema } from 'validationSchema/action-plans';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.action_plan
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getActionPlanById();
    case 'PUT':
      return updateActionPlanById();
    case 'DELETE':
      return deleteActionPlanById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getActionPlanById() {
    const data = await prisma.action_plan.findFirst(convertQueryToPrismaUtil(req.query, 'action_plan'));
    return res.status(200).json(data);
  }

  async function updateActionPlanById() {
    await actionPlanValidationSchema.validate(req.body);
    const data = await prisma.action_plan.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteActionPlanById() {
    const data = await prisma.action_plan.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
