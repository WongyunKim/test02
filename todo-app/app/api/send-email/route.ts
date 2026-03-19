import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { type, schedule } = await request.json();

    const isAdded = type === "added";
    const subject = isAdded
      ? `[일정 추가] ${schedule.title}`
      : `[1시간 전 알림] ${schedule.title}`;

    const priorityLabel: Record<string, string> = {
      high: "높음",
      medium: "보통",
      low: "낮음",
    };

    const html = `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="margin:0 0 16px;color:#1d4ed8;">${subject}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:8px 0;color:#6b7280;width:80px;">제목</td>
            <td style="padding:8px 0;font-weight:600;">${schedule.title}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">날짜</td>
            <td style="padding:8px 0;">${schedule.date}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">시간</td>
            <td style="padding:8px 0;">${schedule.time}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#6b7280;">우선순위</td>
            <td style="padding:8px 0;">${priorityLabel[schedule.priority] ?? schedule.priority}</td>
          </tr>
        </table>
        ${!isAdded ? '<p style="margin-top:16px;color:#dc2626;font-weight:600;">⏰ 일정 시작 1시간 전입니다.</p>' : ""}
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return Response.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
