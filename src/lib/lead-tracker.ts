'use client';

type EventType =
  | 'PAGE_VIEW'
  | 'SECTION_VIEW'
  | 'CASE_OPEN'
  | 'VIDEO_PLAY'
  | 'SCROLL_50'
  | 'SCROLL_75'
  | 'CTA_CLICK'
  | 'FORM_START'
  | 'FORM_SUBMIT'
  | 'RETURN_VISIT';

interface TrackingEvent {
  type: EventType;
  timestamp: number;
  data?: Record<string, string>;
  sessionId: string;
  leadId: string | null;
}

const SCORE_MAP: Record<EventType, number> = {
  PAGE_VIEW: 5,
  SECTION_VIEW: 5,
  CASE_OPEN: 15,
  VIDEO_PLAY: 10,
  SCROLL_50: 10,
  SCROLL_75: 10,
  CTA_CLICK: 20,
  FORM_START: 15,
  FORM_SUBMIT: 30,
  RETURN_VISIT: 25,
};

class LeadTracker {
  private sessionId: string;
  private leadId: string | null = null;
  private events: TrackingEvent[] = [];
  private score = 0;
  private startTime: number;
  private scrollTracked50 = false;
  private scrollTracked75 = false;

  constructor() {
    this.sessionId = this.generateId();
    this.startTime = Date.now();
    if (typeof window !== 'undefined') {
      this.leadId = new URLSearchParams(window.location.search).get('lid');
      this.checkReturnVisit();
      this.initScrollTracking();
      this.initTimeTracking();
      this.track('PAGE_VIEW');
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  private checkReturnVisit() {
    const lastVisit = localStorage.getItem('hiraya_last_visit');
    if (lastVisit) {
      this.track('RETURN_VISIT');
    }
    localStorage.setItem('hiraya_last_visit', Date.now().toString());
  }

  private initScrollTracking() {
    window.addEventListener('scroll', () => {
      const scrollPercent =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !this.scrollTracked50) {
        this.scrollTracked50 = true;
        this.track('SCROLL_50');
      }
      if (scrollPercent >= 75 && !this.scrollTracked75) {
        this.scrollTracked75 = true;
        this.track('SCROLL_75');
      }
    }, { passive: true });
  }

  private initTimeTracking() {
    setTimeout(() => {
      this.score += 10; // 90s stay bonus
    }, 90000);
  }

  track(type: EventType, data?: Record<string, string>) {
    const event: TrackingEvent = {
      type,
      timestamp: Date.now(),
      data,
      sessionId: this.sessionId,
      leadId: this.leadId,
    };
    this.events.push(event);
    this.score += SCORE_MAP[type] || 0;

    // Store locally for resilience
    try {
      const stored = JSON.parse(localStorage.getItem('hiraya_events') || '[]');
      stored.push(event);
      localStorage.setItem('hiraya_events', JSON.stringify(stored.slice(-100)));
      localStorage.setItem('hiraya_score', this.score.toString());
    } catch {
      // Silent fail - tracking should never break UX
    }
  }

  getScore(): number {
    return this.score;
  }

  getSessionDuration(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  getEvents(): TrackingEvent[] {
    return [...this.events];
  }
}

let tracker: LeadTracker | null = null;

export function getTracker(): LeadTracker {
  if (!tracker) {
    tracker = new LeadTracker();
  }
  return tracker;
}

export function trackEvent(type: EventType, data?: Record<string, string>) {
  getTracker().track(type, data);
}
