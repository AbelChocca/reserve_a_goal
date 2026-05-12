import { Injectable } from '@nestjs/common';
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { FolderType } from './storage.types';

@Injectable()
export class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;
  private readonly containerClient: ContainerClient;
  private readonly containerName: string;
  private readonly accountName: string;
  private readonly accountKey: string;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>(
      'AZURE_STORAGE_CONNECTION_STRING',
    );

    this.containerName = this.configService.get<string>(
      'AZURE_STORAGE_CONTAINER',
    )!;

    this.accountName = this.configService.get<string>(
      'AZURE_STORAGE_ACCOUNT_NAME',
    )!;

    this.accountKey = this.configService.get<string>(
      'AZURE_STORAGE_ACCOUNT_KEY',
    )!;

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      connectionString!,
    );

    this.containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );
  }

  generateSAS(fileName: string, folder: FolderType, entityId?: string) {
    const blobName = entityId
      ? `${folder}/${entityId}/${uuidv4()}-${fileName}`
      : `${folder}/${uuidv4()}-${fileName}`;

    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    const sharedKeyCredential = new StorageSharedKeyCredential(
      this.accountName,
      this.accountKey,
    );

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: this.containerName,
        blobName: blobName,
        permissions: BlobSASPermissions.parse('w'),
        startsOn: new Date(),
        expiresOn: new Date(Date.now() + 5 * 60 * 1000),
        protocol: SASProtocol.HttpsAndHttp, // we are on local
      },
      sharedKeyCredential,
    ).toString();

    const uploadUrl = `${blockBlobClient.url}?${sasToken}`;

    return {
      uploadUrl,
      blobUrl: blockBlobClient.url,
    };
  }

  generateUploadUrls(
    filesName: string[],
    folder: FolderType,
    entityId?: string,
  ) {
    return filesName.map((file) => this.generateSAS(file, folder, entityId));
  }
}
