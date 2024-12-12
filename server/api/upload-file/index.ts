export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event);

  for (const file of files) {
    await storeFileLocally(file, file.name, "/images");
  }

  return "success!";
});

interface File {
  name: string;
  content: string;
}
