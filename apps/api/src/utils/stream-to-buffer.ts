export async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers = [];
    stream.on('data', (data) => {
      buffers.push(data);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(buffers));
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}
