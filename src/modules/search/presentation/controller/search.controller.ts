import { Request, Response } from "express";
import { catchAsync } from "../../../../shared/utils";
import { SearchUseCase } from "../../application/search.usecase";

export class SearchController {
  constructor(private readonly searchUsecase: SearchUseCase) {}

  search = catchAsync(async (req: Request, res: Response) => {
    const { q, limit, messagesCursor, usersCursor, conversationsCursor } =
      req.query;

    const result = await this.searchUsecase.execute(
      q as string,
      limit ? Number(limit) : 5,
      {
        messages: messagesCursor as string,
        users: usersCursor as string,
        conversations: conversationsCursor as string,
      },
    );

    res.status(200).json({
      statusCode: 200,
      message: "Search results retrieved successfully",
      data: result,
    });
  });
}
