import Script from "next/script";

// PostHog (EU cloud, one shared free project with bjjmore.com; filter on $host per site).
// Pageviews, heatmaps and session replay; replay settings live in the PostHog project.
// Requests go through /ingest (rewrites in next.config.ts) so ad blockers don't drop them.
// The phc_ key is public by design: it can only send events.
// aimetmax.nl: persistence 'memory' = no cookies and nothing stored in the browser (privacy page
// promises no tracking cookies); text in tool inputs/outputs is masked in replays.
// Only on the production deployment, so previews and local dev don't pollute the data.
const SNIPPET = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('phc_zakTpkxruULWHt3ocPgSDLkuLvu5pUQCK6GqhfHg4wWz', {api_host: '/ingest', ui_host: 'https://eu.posthog.com', defaults: '2026-08-30', person_profiles: 'identified_only', persistence: 'memory', session_recording: {maskTextSelector: 'textarea, pre, code, output, [data-ph-mask]'}});`;

export function PostHog() {
  if (process.env.VERCEL_ENV !== "production") return null;
  return (
    <Script id="posthog" strategy="afterInteractive">
      {SNIPPET}
    </Script>
  );
}
