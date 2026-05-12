import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AzureStorageService } from './azure-storage.service';
import { GenerateSasBatchDto } from './dto/generate-sas.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/auth.decorators';
import { UserRole } from '@prisma/client';

@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN_LOCAL, UserRole.SUPER_ADMIN)
@Controller('storage')
export class AzureStorageController {
  constructor(private readonly azureStorageService: AzureStorageService) {}

  @Post('uploads/sas')
  @HttpCode(200)
  generateSasBatch(@Body() generateSasBatchDto: GenerateSasBatchDto) {
    return this.azureStorageService.generateUploadUrls(
      generateSasBatchDto.filesName,
      generateSasBatchDto.folder,
      generateSasBatchDto.entityId,
    );
  }
}
