document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-triggered fade-in animations
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '100px', threshold: 0.01 });

    document.querySelectorAll('.app-section').forEach(section => observer.observe(section));

    // 2. Glass header scroll effect
    const header = document.querySelector('.glass-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // 3. Smooth card 3D tilt effect
    document.querySelectorAll('.glass-card').forEach(card => {
        let isHovered = false;
        card.addEventListener('mouseenter', () => { isHovered = true; });
        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // 4. Declarative Apps Catalog
    const APPS = [
        { id: 'btn-microg', repo: 'MorpheApp/MicroG-RE', keywords: ['.apk'], fallback: 'https://github.com/MorpheApp/MicroG-RE/releases/latest' },
        { id: 'btn-yt-morphe', channels: ['morphe'], keywords: ['youtube', 'morphe', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-yt-experimental', channels: ['morphe-dev'], keywords: ['youtube', 'experimental', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-ytm-arm64', channels: ['morphe'], keywords: ['music', 'morphe', 'arm64', '.apk'], prefix: 'Arm64', fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-ytm-armv7', channels: ['morphe'], keywords: ['music', 'morphe', 'v7a', '.apk'], prefix: 'Armv7', fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-ytm-experimental', channels: ['morphe-dev'], keywords: ['music', 'experimental', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-instagram', channels: ['piko'], keywords: ['instagram', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-facebook', channels: ['de-vanced'], keywords: ['facebook', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-reddit', channels: ['morphe'], keywords: ['reddit', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-twitter', channels: ['piko'], keywords: ['twitter', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-telegram', channels: ['rushi', 'paresh'], keywords: ['telegram', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-gphotos', channels: ['rushi', 'de-vanced'], keywords: ['google-photos', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-inshorts', channels: ['de-vanced'], keywords: ['inshorts', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-truecaller', channels: ['paresh'], keywords: ['truecaller', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-vn', channels: ['paresh'], keywords: ['vn', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-windscribe', channels: ['rushi'], keywords: ['windscribe', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-terabox', channels: ['rushi'], keywords: ['terabox', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-speedtest', channels: ['rushi'], keywords: ['speedtest', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-accuweather', channels: ['rushi'], keywords: ['accuweather', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-warp', channels: ['rushi'], keywords: ['1.1.1.1', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-ticktick', channels: ['paresh'], keywords: ['ticktick', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-macrodroid', channels: ['paresh'], keywords: ['macrodroid', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-xodo', channels: ['hoo-dles'], keywords: ['xodo', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-wpsoffice', channels: ['hoo-dles'], keywords: ['wps', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-windy', channels: ['hoo-dles'], keywords: ['windy', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-smartlauncher', channels: ['hoo-dles'], keywords: ['smart', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-sleep', channels: ['hoo-dles'], keywords: ['sleep', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-novalauncher', channels: ['hoo-dles'], keywords: ['nova', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-niagara', channels: ['hoo-dles'], keywords: ['niagara', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-ibispaint', channels: ['hoo-dles'], keywords: ['ibis', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-duolingo', channels: ['rushi', 'hoo-dles'], keywords: ['duolingo', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-busuu', channels: ['hoo-dles'], keywords: ['busuu', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-acrobat', channels: ['rushi', 'hooman'], keywords: ['acrobat', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-camscanner', channels: ['hoo-dles'], keywords: ['camscanner', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-inshot', channels: ['hooman'], keywords: ['inshot', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-protonvpn', channels: ['rushi', 'paresh'], keywords: ['proton', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' },
        { id: 'btn-solidexplorer', channels: ['hoo-dles'], keywords: ['solid', '.apk'], fallback: 'https://github.com/Adish08/Syntrophe/releases' }
    ];


    // Helper: Session cache fetcher
    const fetchCached = async (url, key, ttl = 600000) => {
        try {
            const cached = sessionStorage.getItem(key);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed?.timestamp && Date.now() - parsed.timestamp < ttl) {
                    return parsed.data;
                }
            }
        } catch (e) {}

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${url}`);
        const data = await response.json();
        try {
            sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
        } catch (e) {}
        return data;
    };

    // Helper: Extract version string
    const extractVersion = (assetName, releaseTag) => {
        const vMatch = assetName.match(/[-_]v(\d+(?:\.\d+)*)/i) || assetName.match(/v(\d+(?:\.\d+)+)/i);
        if (vMatch) {
            const val = vMatch[0].replace(/^[-_]/, '');
            return val.startsWith('v') || val.startsWith('V') ? val : `v${val}`;
        }
        return releaseTag || '';
    };

    // Helper: Find target asset in Syntrophe release collection
    const findAssetInSyntrophe = (app, releases) => {
        const isExp = app.id.includes('experimental') || app.keywords.some(k => k.toLowerCase().includes('experimental'));
        
        // 1. Always prioritize the Unified Rolling Release ('latest' tag)
        const latestRelease = releases.find(r => r.tag_name === 'latest');
        if (latestRelease) {
            const target = (latestRelease.assets || []).find(asset => {
                const name = asset.name.toLowerCase();
                const cleanKeywords = app.keywords.filter(k => !(app.channels || []).includes(k.toLowerCase()));
                const matches = cleanKeywords.every(k => name.includes(k.toLowerCase()));
                if (matches && !isExp && name.includes('experimental')) return false;
                return matches;
            });
            if (target) {
                return { asset: target, release: latestRelease };
            }
        }

        // 2. Fallback to older / channel-specific releases if not in 'latest'
        for (const release of releases) {
            if (release.tag_name === 'latest') continue;
            if (app.channels && app.channels.length > 0) {
                const matchesChannel = app.channels.some(ch => release.tag_name && release.tag_name.endsWith(`-${ch}`));
                if (!matchesChannel) continue;
            } else if (release.prerelease && !isExp) {
                continue;
            }
            const assets = release.assets || [];
            const target = assets.find(asset => {
                const name = asset.name.toLowerCase();
                const cleanKeywords = app.keywords.filter(k => !(app.channels || []).includes(k.toLowerCase()));
                const matches = cleanKeywords.every(k => name.includes(k.toLowerCase()));
                if (matches && !isExp && name.includes('experimental')) return false;
                return matches;
            });
            if (target) {
                return { asset: target, release };
            }
        }
        return null;
    };

    // Helper: Apply button styling and metadata to card
    const updateButtonUI = (btn, downloadUrl, labelText, updatedAt) => {
        btn.href = downloadUrl;
        btn.removeAttribute('target');
        const span = btn.querySelector('span');
        if (span) span.textContent = labelText;

        if (updatedAt) {
            try {
                const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                const cardContent = btn.closest('.card-content');
                if (cardContent) {
                    let updateEl = cardContent.querySelector('.card-update');
                    if (!updateEl) {
                        updateEl = document.createElement('div');
                        updateEl.className = 'card-update';
                        const cardDesc = cardContent.querySelector('.card-desc');
                        if (cardDesc) {
                            cardDesc.parentNode.insertBefore(updateEl, cardDesc.nextSibling);
                        } else {
                            btn.parentNode.insertBefore(updateEl, btn);
                        }
                    }
                    updateEl.textContent = `Updated: ${formattedDate}`;
                }
            } catch (e) {
                console.error('Error formatting date:', e);
            }
        }
    };

    // 5. Main release loader
    const loadAllReleases = async () => {
        let syntropheReleases = [];
        try {
            syntropheReleases = await fetchCached(
                'https://api.github.com/repos/Adish08/Syntrophe/releases',
                'releases_cache_Adish08_Syntrophe'
            );
        } catch (err) {
            console.warn('Could not fetch Syntrophe releases:', err);
        }

        for (const app of APPS) {
            const btn = document.getElementById(app.id);
            if (!btn) continue;

            const prefix = app.prefix || 'Download';

            try {
                // Non-Syntrophe app (e.g. MicroG)
                if (app.repo) {
                    const repoReleases = await fetchCached(
                        `https://api.github.com/repos/${app.repo}/releases`,
                        `releases_cache_${app.repo}`
                    );
                    const latest = repoReleases?.[0];
                    const asset = latest?.assets?.find(a => app.keywords.every(k => a.name.toLowerCase().includes(k.toLowerCase())));
                    if (asset && latest) {
                        const ver = extractVersion(asset.name, latest.tag_name);
                        updateButtonUI(btn, asset.browser_download_url, `${prefix} ${ver}`.trim(), asset.updated_at);
                        continue;
                    }
                }

                // Syntrophe app matching
                if (syntropheReleases && syntropheReleases.length > 0) {
                    const match = findAssetInSyntrophe(app, syntropheReleases);
                    if (match) {
                        const ver = extractVersion(match.asset.name, match.release.tag_name);
                        updateButtonUI(btn, match.asset.browser_download_url, `${prefix} ${ver}`.trim(), match.asset.updated_at);
                        continue;
                    }
                }

                // Fallback if not resolved
                if (app.fallback) {
                    btn.href = app.fallback;
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'View Releases';
                }
            } catch (err) {
                console.warn(`Error resolving app ${app.id}:`, err);
                if (app.fallback) {
                    btn.href = app.fallback;
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'View Releases';
                }
            }
        }
    };

    loadAllReleases();

    // 6. Disclaimer Popup Handler
    const popup = document.getElementById('disclaimerPopup');
    const closeBtn = document.getElementById('closePopupBtn');
    const STORAGE_KEY = 'apostrophe_disclaimer_accepted_v1';

    if (popup && closeBtn) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTimeout(() => {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 500);
        }

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            document.body.style.overflow = '';
            localStorage.setItem(STORAGE_KEY, 'true');
        });
    }

    // 7. Android Intent Handler (Forces external browser for APK download in WebViews)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (btn && btn.href && btn.href.startsWith('http') && btn.href.endsWith('.apk')) {
            const isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
            if (isAndroid) {
                try {
                    const url = new URL(btn.href);
                    const urlWithoutProtocol = url.hostname + url.pathname + url.search + url.hash;
                    e.preventDefault();
                    window.location.href = `intent://${urlWithoutProtocol}#Intent;scheme=https;end`;
                } catch (err) {
                    console.error('Error creating Android intent URL:', err);
                }
            }
        }
    });
});

// 8. Background Analytics (24h rate-limited visit counter)
(async () => {
    try {
        const lastVisit = localStorage.getItem('apostrophe_last_visit');
        const now = Date.now();
        if (!lastVisit || now - parseInt(lastVisit, 10) > 86400000) {
            await fetch('/api/visit');
            localStorage.setItem('apostrophe_last_visit', now.toString());
        }
    } catch (e) {}
})();
