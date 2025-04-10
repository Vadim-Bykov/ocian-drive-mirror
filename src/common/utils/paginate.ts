import { Model } from 'mongoose';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PaginationResult } from '../interfaces/pagination-result.interface';

export async function paginate<T>(
  model: Model<T>,
  paginationQuery: PaginationQueryDto,
  filter = {},
): Promise<PaginationResult<T>> {
  const { page, size } = paginationQuery;
  const skip = (page - 1) * size;

  const [items, total] = await Promise.all([
    model.find(filter).skip(skip).limit(size).exec(),
    model.countDocuments(filter).exec(),
  ]);

  console.log({ items, total, page, size });

  return new PaginationResult<T>({ items, total, page, size });
}
