var C='sq-v2';
var F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(C).then(function(c){return Promise.all(F.map(function(u){return c.add(u).catch(function(){})}))}));
 self.skipWaiting()});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));
 self.clients.claim()});
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;
 if(new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){
  e.respondWith(fetch(r).then(function(n){var c2=n.clone();caches.open(C).then(function(c){c.put('index.html',c2)});return n})
   .catch(function(){return caches.match('index.html').then(function(m){return m||caches.match('./')})}));
  return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(m){
  return m||fetch(r).then(function(n){var c2=n.clone();caches.open(C).then(function(c){c.put(r,c2)});return n})}))});
