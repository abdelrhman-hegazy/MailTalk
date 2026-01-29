import { RegisterUsecase } from "../../application/use-cases/register.usecase";
import { Request, Response } from "express";
import { RegisterDto } from "../dtos/register.dto";
import { catchAsync } from "../../../../shared/utils/catchAsync";

export class AuthController {
  constructor(private registerUsecase: RegisterUsecase) {}

  register = catchAsync(async (req: Request, res: Response) => {
    const { email, name, password }: RegisterDto = req.body;
    const result = await this.registerUsecase.execute(email, name, password);
    res.status(201).json(result);
  });
}
