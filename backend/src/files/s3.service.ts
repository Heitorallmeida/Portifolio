import { PutObjectCommand, GetObjectCommand, S3Client, ObjectCannedACL } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "crypto";

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3Client({
      region: this.config.get('aws.region'),
      credentials: {
        accessKeyId: this.config.get('aws.accessKeyId'),
        secretAccessKey: this.config.get('aws.secretAccessKey'),
      },
    });
  }

  async uploadFile(contentType, key) {
    return await this.generateUploadUrl(
      this.config.get('aws.bucket'),
      key,
      contentType,
      3600,
    );
  }
  
 async generateUploadUrl(
    bucketName: string,
    key: string,
    contentType: string,
    expiresIn: number = 3600, // 1 hora
  ) {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      // Sem ACL - usa permissões do bucket
    });

    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn,
    });
    console.log('Generated S3 upload URL:', signedUrl);

    return {
      uploadUrl: signedUrl,
      key,
      bucketName,
    };
  }

   async generateAccessUrl(fileName) {
    const command = new GetObjectCommand({
        Bucket: this.config.get('aws.bucket'),
        Key: fileName
    });

    const accessUrl = await getSignedUrl(this.s3, command, { 
        expiresIn: 86400 // 24 horas
    });
    
    return accessUrl;
}
}