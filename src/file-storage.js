// Import the necessary class from the @azure/storage-blob package
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

async function getTheImage(accountName, accessKey, imagePath) {
    // Use the StorageSharedKeyCredential with your storage account and access key
    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        new StorageSharedKeyCredential(accountName, accessKey)
    );

    const containerName = "philosophers";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(imagePath);
    const downloadBlockBlobResponse = await blobClient.download(0); // Starts downloading from the beginning of the blob
    const properties = await blobClient.getProperties();

    return [downloadBlockBlobResponse, properties];
}

module.exports = { getTheImage };
