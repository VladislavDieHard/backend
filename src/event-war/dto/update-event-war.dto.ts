import { PartialType } from '@nestjs/swagger';
import { CreateEventWarDto } from './create-event-war.dto';

export class UpdateEventWarDto extends PartialType(CreateEventWarDto) {}
