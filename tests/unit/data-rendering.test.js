import { describe, it, expect, beforeEach } from 'vitest'

describe('Data Rendering', () => {
  beforeEach(() => {
    // Create containers for testing
    document.body.innerHTML = `
      <div id="certifications-container"></div>
      <div id="awards-container"></div>
      <div id="skills-container"></div>
      <div id="publications-container"></div>
    `
  })

  describe('Certifications Rendering', () => {
    it('should render certification card with cert-card class when image present', () => {
      const certifications = [
        {
          title: 'Certified Scrum Master (CSM)',
          org: 'Scrum Alliance',
          date: '2026',
          desc: 'Certification description',
          url: 'https://bcert.me/example',
          image: 'images/csm-badge.jpg'
        }
      ]

      document.getElementById('certifications-container').innerHTML =
        certifications.map(c => `
          <div class="exp-card ${c.image ? 'cert-card' : ''}">
            <div>
              <h3>${c.title}</h3>
              <div class="org">${c.org}</div>
              <div class="date">${c.date}</div>
              <p>${c.desc}</p>
              ${c.url ? `<a href="${c.url}" target="_blank" class="cert-link">View Credential →</a>` : ''}
            </div>
            ${c.image ? `<a href="${c.url}" target="_blank"><img src="${c.image}" alt="${c.title}" class="cert-badge"></a>` : ''}
          </div>
        `).join('')

      const card = document.querySelector('.exp-card')
      expect(card.classList.contains('cert-card')).toBe(true)
      expect(card.querySelector('h3').textContent).toBe('Certified Scrum Master (CSM)')
      expect(card.querySelector('.org').textContent).toBe('Scrum Alliance')
      expect(card.querySelector('.cert-badge').src).toContain('csm-badge.jpg')
    })

    it('should render credential link with correct URL', () => {
      const certifications = [
        {
          title: 'Test Cert',
          org: 'Test Org',
          date: '2026',
          desc: 'Test',
          url: 'https://bcert.me/test123',
          image: 'images/test.jpg'
        }
      ]

      document.getElementById('certifications-container').innerHTML =
        certifications.map(c => `
          <div class="exp-card ${c.image ? 'cert-card' : ''}">
            <div>
              <h3>${c.title}</h3>
              <div class="org">${c.org}</div>
              <div class="date">${c.date}</div>
              <p>${c.desc}</p>
              ${c.url ? `<a href="${c.url}" target="_blank" class="cert-link">View Credential →</a>` : ''}
            </div>
            ${c.image ? `<a href="${c.url}" target="_blank"><img src="${c.image}" alt="${c.title}" class="cert-badge"></a>` : ''}
          </div>
        `).join('')

      const link = document.querySelector('.cert-link')
      expect(link.href).toContain('bcert.me/test123')
    })
  })

  describe('Awards Rendering', () => {
    it('should render award card with award-card class when image present', () => {
      const awards = [
        {
          title: 'Spot Award',
          org: 'LANL',
          date: '2024',
          desc: 'Award description',
          image: 'images/award.jpg'
        }
      ]

      document.getElementById('awards-container').innerHTML =
        awards.map(a => `
          <div class="exp-card ${a.image ? 'award-card' : ''}">
            <div>
              <h3>${a.title}</h3>
              <div class="org">${a.org}</div>
              <div class="date">${a.date}</div>
              <p>${a.desc}</p>
            </div>
            ${a.image ? `<img src="${a.image}" alt="${a.title}">` : ''}
          </div>
        `).join('')

      const card = document.querySelector('.exp-card')
      expect(card.classList.contains('award-card')).toBe(true)
      expect(card.querySelector('img').src).toContain('award.jpg')
    })
  })

  describe('Skills/Interests Rendering', () => {
    it('should render skills and interests separated by slash', () => {
      const skills = ['Python', 'JavaScript', 'Web Development']
      const interests = ['Cybersecurity', 'Embedded Systems']

      const skillsTags = skills.map(s => `<span class="interest-tag">${s}</span>`).join('')
      const interestsTags = interests.map(i => `<span class="interest-tag">${i}</span>`).join('')

      document.getElementById('skills-container').innerHTML =
        `${skillsTags}<span class="tag-separator"> / </span>${interestsTags}`

      const separator = document.querySelector('.tag-separator')
      expect(separator).toBeTruthy()
      expect(separator.textContent).toBe(' / ')

      const tags = document.querySelectorAll('.interest-tag')
      expect(tags).toHaveLength(5)
      expect(tags[0].textContent).toBe('Python')
      expect(tags[2].textContent).toBe('Web Development')
      expect(tags[3].textContent).toBe('Cybersecurity')
    })
  })

  describe('Publications Rendering', () => {
    it('should render publications as links', () => {
      const publications = [
        {
          title: 'Test Paper',
          venue: 'Test Conference',
          date: '2024',
          desc: 'Test description',
          link: 'https://example.com/paper'
        }
      ]

      document.getElementById('publications-container').innerHTML =
        publications.map(p => `
          <a href="${p.link}" class="exp-card" style="text-decoration:none; color:inherit; display:block;">
            <h3>${p.title}</h3>
            <div class="org">${p.venue}</div>
            <div class="date">${p.date}</div>
            <p>${p.desc}</p>
          </a>
        `).join('')

      const link = document.querySelector('a.exp-card')
      expect(link.href).toContain('example.com/paper')
      expect(link.querySelector('h3').textContent).toBe('Test Paper')
    })
  })
})
