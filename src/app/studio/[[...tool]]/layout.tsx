export const metadata = {
  title: "Zentaana Canis — CMS",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
