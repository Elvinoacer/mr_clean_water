export default function Footer() {
  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    lineHeight: 2.2,
    transition: 'color 200ms ease-out',
  };

  return (
    <footer
      style={{
        background: '#004863',
        padding: '80px 64px 40px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Top Row */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex flex-col items-start leading-none mb-4">
              <span className="font-bold tracking-tight" style={{ color: '#00D26A', fontSize: 22, letterSpacing: '-0.02em' }}>MR</span>
              <span className="font-semibold tracking-wide" style={{ color: '#fff', fontSize: 10, letterSpacing: '0.06em' }}>CLEAN WATER</span>
            </div>
            <p className="text-body" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
              Reliable bulk water delivery serving Nakuru Town and surrounding areas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/254724755580"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/MrCleanWaterNakuru"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="text-caption text-white mb-4">Services</div>
            <ul className="list-none p-0">
              {['Residential', 'Commercial', 'Construction', 'Institutional', 'Industrial', 'Emergency'].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="block transition-colors duration-200 hover:text-white"
                    style={linkStyle}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="text-caption text-white mb-4">Company</div>
            <ul className="list-none p-0">
              {['About Us', 'Coverage Area', 'How It Works', 'Contact'].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s.toLowerCase().replace(/\s+/g, '-').replace('about-us', 'about').replace('coverage-area', 'coverage')}`}
                    className="block transition-colors duration-200 hover:text-white"
                    style={linkStyle}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="text-caption text-white mb-4">Contact</div>
            <div className="text-body text-white mb-2" style={{ fontWeight: 600 }}>
              0724 755 580
            </div>
            <a
              href="https://wa.me/254724755580"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body block mb-4 transition-colors duration-200 hover:underline"
              style={{ color: '#00D26A' }}
            >
              Message on WhatsApp
            </a>
            <div className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Available 24/7 for emergencies
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '48px 0' }} />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-caption" style={{ color: 'rgba(255,255,255,0.4)' }}>
            2025 Mr Clean Water. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-caption transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Privacy Policy
            </a>
            <a href="#" className="text-caption transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
