import React from 'react'
import './CodeforcesWidget.css'

const CodeforcesWidget = () => {
  const platforms = [
    {
      name: 'Codeforces',
      logo: 'CF',
      rank: 'Expert',
      handle: 'rn_das_2004',
      rating: '1708',
      color: '#ff6b6b',
      bgGradient: 'linear-gradient(135deg, #ff6b6b, #ff8e53)'
    },
    {
      name: 'LeetCode',
      logo: 'LC',
      rank: 'Knight',
      handle: 'rn_das_2004',
      rating: '2066',
      color: '#ffa116',
      bgGradient: 'linear-gradient(135deg, #ffa116, #ffb347)'
    },
    {
      name: 'CodeChef',
      logo: 'CC',
      rank: '5 Star',
      handle: 'an_isc_kid',
      rating: '2028',
      color: '#8b4513',
      bgGradient: 'linear-gradient(135deg, #8b4513, #a0522d)'
    }
  ]

  return (
    <div className="competitive-widget">
      <div className="widget-header">
        <div className="header-icon">🏆</div>
        <h3>Competitive Programming</h3>
      </div>
      
      <div className="widget-content">
        <div className="platforms-container">
          {platforms.map((platform, index) => (
            <div key={platform.name} className="platform-card">
              <div className="platform-header">
                <div 
                  className="platform-logo"
                  style={{ background: platform.bgGradient }}
                >
                  {platform.logo}
                </div>
                <div className="platform-info">
                  <div className="platform-name">{platform.name}</div>
                  <div className="platform-rank">{platform.rank}</div>
                </div>
              </div>
              
              <div className="platform-details">
                <div className="detail-row">
                  <span className="detail-label">Handle:</span>
                  <span className="detail-value">{platform.handle}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Rating:</span>
                  <span className="detail-value">{platform.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="summary-stats">
          <div className="summary-item">
            <div className="summary-icon">🎯</div>
            <div className="summary-text">
              <div className="summary-value">3</div>
              <div className="summary-label">Platforms</div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">⚡</div>
            <div className="summary-text">
              <div className="summary-value">1300+</div>
              <div className="summary-label">Problems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeforcesWidget
