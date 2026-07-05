export const TEST_STREAMS = [
  {
    name: 'Mux Test Stream (Big Buck Bunny)',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    name: 'Tears of Steel (Live Demo)',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
  },
  {
    name: 'Oceans (Adaptive)',
    url: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8'
  }
];

export const T_SPORTS_STREAM = 'http://198.195.239.50:8095/tsports/tracks-v1a1/mono.m3u8';
export const BTV_STREAM = 'http://198.195.239.50:8095/btv/tracks-v1a1/mono.m3u8';
export const SOMOY_TV_2_STREAM = 'http://198.195.239.50:8095/somoyTv/tracks-v1a1/mono.m3u8';
export const WORLDCUP_TV_STREAM = 'https://andro.226503.xyz/checklist/androstreamlivebs1.m3u8?ref=fifa';

export const FEATURED_CHANNELS = [
  {
    name: 'tsports',
    logoText: 'TS',
    logoSrc: '/tsports.png',
    streamUrl: T_SPORTS_STREAM,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    hoverBorderColor: 'rgba(239, 68, 68, 0.6)',
    shadowColor: 'rgba(239, 68, 68, 0.18)',
    softShadowColor: 'rgba(239, 68, 68, 0.05)',
    liveColor: '#ef4444',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
  },
  {
    name: 'BTV',
    logoText: 'BTV',
    logoSrc: '/btv-logo.png',
    streamUrl: BTV_STREAM,
    borderColor: 'rgba(34, 197, 94, 0.25)',
    hoverBorderColor: 'rgba(34, 197, 94, 0.6)',
    shadowColor: 'rgba(34, 197, 94, 0.18)',
    softShadowColor: 'rgba(34, 197, 94, 0.05)',
    liveColor: '#22c55e',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
  },
  {
    name: 'worldcupTV',
    logoText: 'WCTV',
    streamUrl: WORLDCUP_TV_STREAM,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    hoverBorderColor: 'rgba(245, 158, 11, 0.6)',
    shadowColor: 'rgba(245, 158, 11, 0.18)',
    softShadowColor: 'rgba(245, 158, 11, 0.05)',
    liveColor: '#f59e0b',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)'
  },
  {
    name: 'Somoy TV',
    logoText: 'SOMOY',
    logoSrc: '/somoy-tv-logo.png',
    streamUrl: 'https://live.thebosstv.com:30443/dwlive/Somoy-TV/chunks.m3u8',
    borderColor: 'rgba(14, 165, 233, 0.25)',
    hoverBorderColor: 'rgba(14, 165, 233, 0.6)',
    shadowColor: 'rgba(14, 165, 233, 0.18)',
    softShadowColor: 'rgba(14, 165, 233, 0.05)',
    liveColor: '#0ea5e9',
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)'
  },
  {
    name: 'Somoy TV 2',
    logoText: 'SOMOY 2',
    logoSrc: '/somoy-tv-logo.png',
    streamUrl: SOMOY_TV_2_STREAM,
    borderColor: 'rgba(59, 130, 246, 0.25)',
    hoverBorderColor: 'rgba(59, 130, 246, 0.6)',
    shadowColor: 'rgba(59, 130, 246, 0.18)',
    softShadowColor: 'rgba(59, 130, 246, 0.05)',
    liveColor: '#3b82f6',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(14, 165, 233, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
  },
  {
    name: 'Fussball TV1',
    logoText: 'FTV1',
    streamUrl: 'https://edge22.776740.ir.cdn.ir/hls2/sport.m3u8',
    borderColor: 'rgba(34, 197, 94, 0.25)',
    hoverBorderColor: 'rgba(34, 197, 94, 0.6)',
    shadowColor: 'rgba(34, 197, 94, 0.18)',
    softShadowColor: 'rgba(34, 197, 94, 0.05)',
    liveColor: '#22c55e',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)'
  },
  {
    name: 'Fox TV',
    logoText: 'FOX',
    streamUrl: 'https://1nyaler.streamhostingcdn.top/stream/26/index.m3u8',
    borderColor: 'rgba(249, 115, 22, 0.25)',
    hoverBorderColor: 'rgba(249, 115, 22, 0.6)',
    shadowColor: 'rgba(249, 115, 22, 0.18)',
    softShadowColor: 'rgba(249, 115, 22, 0.05)',
    liveColor: '#f97316',
    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 179, 8, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  },
  {
    name: 'beIN Sports',
    logoText: 'beIN',
    streamUrl: 'https://andro.evrenesoglu57.click/checklist/androstreamliveexn4.m3u8',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    hoverBorderColor: 'rgba(168, 85, 247, 0.6)',
    shadowColor: 'rgba(168, 85, 247, 0.18)',
    softShadowColor: 'rgba(168, 85, 247, 0.05)',
    liveColor: '#a855f7',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
  },
  {
    name: 'beIN Sports 2',
    logoText: 'beIN2',
    streamUrl: 'https://1nyaler.streamhostingcdn.top/stream/23/index.m3u8',
    borderColor: 'rgba(99, 102, 241, 0.25)',
    hoverBorderColor: 'rgba(99, 102, 241, 0.6)',
    shadowColor: 'rgba(99, 102, 241, 0.18)',
    softShadowColor: 'rgba(99, 102, 241, 0.05)',
    liveColor: '#6366f1',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 165, 233, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #6366f1 0%, #3730a3 100%)'
  }
];

export const BANGLA_CHANNELS = [
  {
    name: 'Channel 24',
    logoText: 'C24',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8',
    borderColor: 'rgba(14, 165, 233, 0.25)',
    hoverBorderColor: 'rgba(14, 165, 233, 0.6)',
    shadowColor: 'rgba(14, 165, 233, 0.18)',
    softShadowColor: 'rgba(14, 165, 233, 0.05)',
    liveColor: '#0ea5e9',
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
  },
  {
    name: 'Independent TV',
    logoText: 'IND',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    hoverBorderColor: 'rgba(245, 158, 11, 0.6)',
    shadowColor: 'rgba(245, 158, 11, 0.18)',
    softShadowColor: 'rgba(245, 158, 11, 0.05)',
    liveColor: '#f59e0b',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    name: 'BTV',
    logoText: 'BTV',
    logoSrc: '/btv-logo.png',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8',
    borderColor: 'rgba(34, 197, 94, 0.25)',
    hoverBorderColor: 'rgba(34, 197, 94, 0.6)',
    shadowColor: 'rgba(34, 197, 94, 0.18)',
    softShadowColor: 'rgba(34, 197, 94, 0.05)',
    liveColor: '#22c55e',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
  },
  {
    name: 'ATN Bangla',
    logoText: 'ATN',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8',
    borderColor: 'rgba(217, 70, 239, 0.25)',
    hoverBorderColor: 'rgba(217, 70, 239, 0.6)',
    shadowColor: 'rgba(217, 70, 239, 0.18)',
    softShadowColor: 'rgba(217, 70, 239, 0.05)',
    liveColor: '#d946ef',
    background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)'
  },
  {
    name: 'NTV',
    logoText: 'NTV',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    hoverBorderColor: 'rgba(59, 130, 246, 0.6)',
    shadowColor: 'rgba(59, 130, 246, 0.18)',
    softShadowColor: 'rgba(59, 130, 246, 0.05)',
    liveColor: '#3b82f6',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  {
    name: 'Channel I',
    logoText: 'Ch I',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    hoverBorderColor: 'rgba(16, 185, 129, 0.6)',
    shadowColor: 'rgba(16, 185, 129, 0.18)',
    softShadowColor: 'rgba(16, 185, 129, 0.05)',
    liveColor: '#10b981',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  }
];

