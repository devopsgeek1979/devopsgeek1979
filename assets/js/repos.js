/* repos.js — fetch and render GitHub repos for devopsgeek1979 */
(function () {
  const USERNAME = 'devopsgeek1979';
  const API_URL  = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`;

  // Map language names to approximate hex colours (GitHub's palette)
  const LANG_COLORS = {
    Python:     '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Shell:      '#89e051',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    HCL:        '#844FBA',
    Dockerfile: '#384d54',
    Go:         '#00ADD8',
    Ruby:       '#701516',
    Java:       '#b07219',
    'C#':       '#178600',
    YAML:       '#cb171e',
  };

  const REPO_FALLBACK_DESCRIPTIONS = {
    devopsgeek1979: 'Personal DevOps engineering workspace with automation experiments, infra patterns, and platform learning notes.',
    'openshift-101': 'Hands-on OpenShift fundamentals with practical setup examples, core workload operations, and platform basics.',
    'ansible-vmware': 'Infrastructure automation playbooks for VMware provisioning, configuration management, and repeatable operations.',
    'n8n-ai-workflow-simpler': 'Lightweight n8n workflow templates for AI automation, task orchestration, and no-code process integration.',
    'terraform-basic': 'Starter Terraform configurations demonstrating foundational IaC patterns, reusable modules, and environment setup.',
    'gh-devops-repo': 'Sample DevOps repository structure with CI/CD scaffolding, automation conventions, and delivery workflow examples.',
    'devops-job-automation-platform': 'Automation toolkit for common DevOps job flows including scheduling, execution, and operational visibility.',
    'devopsgeek1979.github.io': 'Source code for the public portfolio site showcasing DevOps projects, experience, and engineering outcomes.',
    'kubernetes-29': 'Kubernetes practice repository with cluster operations examples, deployment manifests, and platform troubleshooting labs.',
  };

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeExternalUrl(value) {
    try {
      const url = new URL(value);
      if (url.protocol === 'https:' || url.protocol === 'http:') {
        return url.href;
      }
    } catch (error) {
      return 'https://github.com/devopsgeek1979?tab=repositories';
    }
    return 'https://github.com/devopsgeek1979?tab=repositories';
  }

  function toTitleFromRepoName(name) {
    return String(name || '')
      .split(/[-_]+/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  function getFallbackDescription(repo) {
    const repoName = String(repo && repo.name ? repo.name : '').toLowerCase();
    if (repoName && REPO_FALLBACK_DESCRIPTIONS[repoName]) {
      return REPO_FALLBACK_DESCRIPTIONS[repoName];
    }

    const language = repo && repo.language ? repo.language : 'software';
    const readableName = toTitleFromRepoName(repoName || 'project');
    return `${readableName} repository with practical ${language} implementation examples, automation workflows, and maintainable project structure.`;
  }

  function langDot(lang) {
    const color = LANG_COLORS[lang] || '#8fa2d9';
    return `<span class="repo-lang-dot" style="background:${color}"></span>`;
  }

  function renderRepo(repo) {
    const safeName = escapeHTML(repo.name || 'untitled-repo');
    const safeUrl = safeExternalUrl(repo.html_url);
    const safeDescription = repo.description ? escapeHTML(String(repo.description).trim()) : '';
    const safeLanguage = repo.language ? escapeHTML(repo.language) : '';
    const desc    = safeDescription || escapeHTML(getFallbackDescription(repo));
    const lang    = safeLanguage ? `<span class="repo-lang">${langDot(safeLanguage)}${safeLanguage}</span>` : '';
    const stars   = repo.stargazers_count > 0
      ? `<span title="Stars"><svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${repo.stargazers_count}</span>`
      : '';
    const forks   = repo.forks_count > 0
      ? `<span title="Forks"><svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>${repo.forks_count}</span>`
      : '';
    const updated = new Date(repo.updated_at).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });

    return `
      <a class="repo-card" href="${safeUrl}" target="_blank" rel="noopener noreferrer">
        <div class="repo-name">
          <svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          ${safeName}
        </div>
        <div class="repo-desc">${desc}</div>
        <div class="repo-meta">
          ${lang}
          ${stars}
          ${forks}
          <span title="Last updated">${updated}</span>
        </div>
      </a>`.trim();
  }

  async function loadRepos() {
    const loading = document.getElementById('repos-loading');
    const grid    = document.getElementById('repo-grid');
    if (!loading || !grid) return;

    try {
      const res  = await fetch(API_URL);
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const repos = await res.json();

      // Filter out forks and the profile/pages repo itself if desired
      const filtered = repos.filter(r => !r.fork);

      grid.innerHTML = filtered.map(renderRepo).join('');
      loading.hidden = true;
      grid.hidden    = false;

      // Re-initialise Lucide for the newly inserted SVGs won't need it
      // since we used inline SVG strings in renderRepo
    } catch (err) {
      loading.innerHTML = '';
      const notice = document.createElement('div');
      notice.className = 'notice';
      notice.style.textAlign = 'left';

      const title = document.createElement('strong');
      title.textContent = 'Could not load repositories.';
      notice.appendChild(title);
      notice.appendChild(document.createElement('br'));

      const errorLine = document.createElement('span');
      errorLine.textContent = String(err && err.message ? err.message : 'Unexpected error');
      notice.appendChild(errorLine);
      notice.appendChild(document.createElement('br'));

      const link = document.createElement('a');
      link.href = 'https://github.com/devopsgeek1979?tab=repositories';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View on GitHub directly →';
      notice.appendChild(link);

      loading.appendChild(notice);
    }
  }

  document.addEventListener('DOMContentLoaded', loadRepos);
})();
