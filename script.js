document.querySelectorAll('.menu-toggle').forEach(btn=>btn.addEventListener('click',()=>{const nav=document.querySelector('.nav-links');const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));}));
const form=document.querySelector('#inquiry-form');
if(form){const st=form.querySelector('.form-status'),btn=form.querySelector('button[type=submit]');
form.querySelectorAll('[required]').forEach(el=>el.addEventListener('input',()=>el.classList.remove('invalid')));
form.addEventListener('submit',e=>{e.preventDefault();let bad=false;
form.querySelectorAll('[required]').forEach(el=>{const ok=el.value.trim()!==''&&(el.type!=='email'||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));el.classList.toggle('invalid',!ok);if(!ok)bad=true;});
if(bad){st.className='form-status err';st.textContent='Please fill in all required fields (*) with a valid email address.';return;}
btn.disabled=true;st.className='form-status';st.textContent='Sending…';
fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)}).then(r=>r.json()).then(d=>{if(!d.success)throw new Error(d.message);form.reset();st.className='form-status ok';st.textContent='Thank you — your inquiry has been sent. We will get back to you soon.';}).catch(()=>{st.className='form-status err';st.textContent='Sorry, something went wrong. Please try again in a moment.';}).finally(()=>{btn.disabled=false;});});}
