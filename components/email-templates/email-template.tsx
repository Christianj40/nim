import { ReactNode } from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      backgroundColor: '#0b0809',
      color: '#f1f1f1',
      fontFamily: 'Arial, sans-serif'
    }}>
      <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#0f0f0f', padding: '40px 20px' }}>
        <tr>
          <td align="center">
            <table role="presentation" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '8px' }}>
              {/* Header */}
              <tr>
                <td style={{ padding: '20px 0' }}>
                  <a href="www.staggraphics.com" style={{ textDecoration: 'none' }}>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>Christian Jenkins</h2>
                    <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#aaaaaa' }}>Stag Graphics</p>
                  </a>
                </td>
              </tr>

              {/* Title */}
              <tr>
                <td style={{ padding: '20px 0' }}>
                  <h1 style={{ margin: '0 0 10px', fontSize: '24px', color: '#ffffff' }}>New Contact Message</h1>
                  <p style={{ margin: 0, fontSize: '14px', color: '#cccccc' }}>You've received a new message from your website contact form.</p>
                </td>
              </tr>

              {/* Message Content */}
              <tr>
                <td style={{ padding: '20px 0' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#aaaaaa', margin: '0 0 8px 0' }}>From:</p>
                    <p style={{ fontSize: '16px', color: '#ffffff', margin: 0 }}>{name}</p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#aaaaaa', margin: '0 0 8px 0' }}>Email:</p>
                    <p style={{ fontSize: '16px', color: '#ffffff', margin: 0 }}>{email}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#aaaaaa', margin: '0 0 8px 0' }}>Message:</p>
                    <p style={{ fontSize: '16px', color: '#ffffff', margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
                  </div>
                </td>
              </tr>

              {/* Contact Info */}
              <tr>
                <td style={{ padding: '10px 0' }}>
                  <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#aaaaaa' }}>
                    Feel free to reach me at:
                    <a href="mailto:christian@staggraphics.com" style={{ color: '#cccccc', textDecoration: 'underline' }}>christian@staggraphics.com</a>
                  </p>
                </td>
              </tr>

              {/* Social Links */}
              <tr>
                <td style={{ padding: '10px 0 30px' }}>
                  <p style={{ fontSize: '14px', color: '#aaaaaa', margin: '0 0 10px' }}>Follow me:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>BlueSky ↗</a>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>Facebook ↗</a>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>Twitter ↗</a>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>LinkedIn ↗</a>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>Instagram ↗</a>
                    <a href="#" style={{ display: 'inline-block', backgroundColor: '#2a2a2a', color: '#ffffff', padding: '6px 12px', fontSize: '12px', borderRadius: '20px', textDecoration: 'none' }}>TikTok ↗</a>
                  </div>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td style={{ borderTop: '1px solid #333', paddingTop: '15px', fontSize: '12px', color: '#888888' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <span>© 2025 Stag Graphics.</span>
                    <a href="www.stagsections.com" style={{ textDecoration: 'none', color: 'inherit' }}><span>Stag Sections ●</span></a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  )
} 