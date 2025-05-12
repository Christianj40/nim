import { ReactNode } from 'react'

interface NewsletterTemplateProps {
  email: string
}

export function NewsletterTemplate({ email }: NewsletterTemplateProps) {
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
                  <h1 style={{ margin: '0 0 10px', fontSize: '24px', color: '#ffffff' }}>Welcome to Stag Sections!</h1>
                  <p style={{ margin: 0, fontSize: '14px', color: '#cccccc' }}>Thanks for joining our journey in creating beautiful WordPress blocks.</p>
                </td>
              </tr>

              {/* Content */}
              <tr>
                <td style={{ padding: '20px 0' }}>
                  <p style={{ fontSize: '16px', color: '#ffffff', margin: '0 0 20px 0', lineHeight: '1.5' }}>
                    We're excited to have you on board! You'll be the first to know about:
                  </p>
                  <ul style={{ 
                    fontSize: '16px', 
                    color: '#ffffff', 
                    margin: '0 0 20px 0', 
                    paddingLeft: '20px',
                    lineHeight: '1.5'
                  }}>
                    <li style={{ marginBottom: '10px' }}>Early access to the plugin</li>
                    <li style={{ marginBottom: '10px' }}>Development updates and progress</li>
                    <li style={{ marginBottom: '10px' }}>Exclusive previews of new features</li>
                    <li>Tips and tutorials for using Stag Sections</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: '#ffffff', margin: '0 0 20px 0', lineHeight: '1.5' }}>
                    We'll keep you updated at: <span style={{ color: '#cccccc' }}>{email}</span>
                  </p>
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