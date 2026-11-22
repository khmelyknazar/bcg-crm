import { IsIn } from 'class-validator';

export class UpdateRoleDto {
  @IsIn(['OWNER', 'MANAGER'])
  role!: 'OWNER' | 'MANAGER';
}