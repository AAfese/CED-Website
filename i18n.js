/* =========================================================================
   Christ Embassy Duncanville — bilingual engine (English / Español)
   -------------------------------------------------------------------------
   Loaded LAST on every page (after site.js and any page inline script) so the
   shared nav/footer and page DOM already exist when this runs.

   How it works
   - Static text carries a data attribute pointing into the DICT below:
       data-i18n          -> element.textContent
       data-i18n-html     -> element.innerHTML (strings that include <span> etc.)
       data-i18n-ph       -> element.placeholder
       data-i18n-aria     -> element.aria-label
   - The ENG/ESP toggle (rendered in site.js) carries .lang-btn[data-lang].
   - Choice is saved to localStorage('ced-lang') and applied on every page load.
   - On change, a window 'cedlangchange' event fires so JS-rendered sections
     (beliefs, leaders, classes, departments, form messages) can re-render.
   Submission labels (data-label) are intentionally left in English so the
   church inbox always receives consistently-labelled entries.
   ========================================================================= */
(function () {
  'use strict';

  var DICT = {
    en: {
      /* ---------- Shared nav + footer ---------- */
      'nav.home': 'Home',
      'nav.events': 'Events',
      'nav.newhere': 'New Here',
      'nav.connect': 'Connect',
      'nav.giving': 'Giving',
      'nav.contact': 'Contact',
      'nav.plan_visit': 'Plan a Visit',
      'footer.tagline': 'A LoveWorld Nation church in Duncanville, Texas — serving Cedar Hill, DeSoto, Lancaster and the greater Dallas area. Wherever you are on your journey of faith, you belong here.',
      'footer.quicklinks': 'Quick Links',
      'footer.contact_h': 'Contact',
      'footer.location_h': 'Location',
      'footer.service_times': 'Service Times',
      'footer.services_html': 'Sun · 10:00 AM<br>Wed · 6:30 PM',
      'footer.rights': 'All rights reserved.',
      'footer.affiliation': "Affiliated with Believers' LoveWorld Incorporated.",

      /* ---------- Home ---------- */
      'hero.badge': 'Welcome to Christ Embassy Duncanville',
      'hero.title_html': 'You <span class="italic text-gold">Belong</span> Here',
      'hero.lead': 'A loving family in the heart of Duncanville, Texas — where you are seen, known, and welcomed home. Come as you are and discover your purpose in Christ.',
      'hero.cta_visit': 'Plan Your Visit',
      'hero.cta_watch': 'Watch Online',
      'hero.scroll': 'Watch',
      'mission.badge': 'Who We Are',
      'mission.title_html': 'Rooted in love, <span class="text-royal">reaching the city</span>',
      'mission.lead': "We are a LoveWorld Nation family in Duncanville, Texas — passionate about God, and devoted to the people He's called us to reach. Here's what drives everything we do.",
      'mission.mission_h': 'Our Mission',
      'mission.mission_b': 'To raise generations of men and women who will come into their inheritance in Christ, fulfill their purpose, and become effective witnesses.',
      'mission.vision_h': 'Our Vision',
      'mission.vision_b': 'To take the divine presence of God to the peoples and nations of the world, and to demonstrate the character of the Holy Spirit.',
      'beliefs.badge': 'What We Believe',
      'beliefs.title_html': 'The foundation <span class="italic text-gold">of our faith</span>',
      'beliefs.lead': 'Ten truths at the heart of everything we teach and live.',
      'leadership.badge': 'Our Leadership',
      'leadership.title_html': 'Shepherds with a <span class="text-royal">heart for you</span>',
      'leadership.lead': 'Meet the men and women who lovingly serve and lead our church family.',

      /* ---------- Events ---------- */
      'events.badge': 'Upcoming Events',
      'events.title_html': 'Be part of what <span class="italic text-gold">God is doing</span>',
      'events.lead': 'Gather with us for these special services and crusades. Come expectant — every meeting is an encounter with the presence and power of God.',
      'events.upcoming': 'Upcoming',
      'events.register': 'Register Now',
      'events.details': 'View Details',
      'events.directions': 'Get Directions',
      'events.e2_date': 'Fri 24 – Sun 26 July 2026 · 8:00 AM CST',
      'events.e2_loc': 'Live online & at Christ Embassy Duncanville',
      'events.e2_desc': 'A global healing service with Pastor Chris. Join us live as the sick are healed and lives are restored by the power of God.',
      'events.e3_date': 'Sat 4 July 2026',
      'events.e3_loc': '100 James Collins Blvd, Duncanville, TX 75116',
      'events.e3_desc': "ReachOut World USA is a powerful global evangelism campaign organized by LoveWorld Incorporated (Christ Embassy), dedicated to distributing Rhapsody of Realities and sharing the Gospel with people around the world. As America celebrates its 250th birthday this year, we have a special opportunity on July 4th to reach out to our communities with the love of Christ. What better way to celebrate our nation than by spreading hope, faith, and God's love to those around us? Join us as we make an impact, one life at a time!",

      /* ---------- Giving ---------- */
      'giving.badge': 'Giving',
      'giving.title_html': 'Partner with <span class="italic text-gold">the vision</span>',
      'giving.lead': 'Your generosity helps take the gospel to Duncanville and beyond. Give securely online in just a moment.',
      'giving.give_h': 'Give securely online',
      'giving.give_b': 'Make a one-time gift or set up recurring giving below. Your transaction is processed securely by Tithely.',
      'giving.fallback': 'Having trouble with the form?',
      'giving.fallback_link': 'Give directly on Tithely →',
      'giving.help': 'Prefer to give another way or have a question?',
      'giving.contact_btn': 'Contact our team',

      /* ---------- Contact ---------- */
      'contact.badge': 'Get in Touch',
      'contact.title_html': "We'd love to <span class=\"italic text-gold\">hear from you</span>",
      'contact.lead': 'Visit us this Sunday, send a message, or reach out any time — our family is here for you.',
      'contact.visit_h': 'Visit Us',
      'contact.directions': 'Get Directions',
      'contact.email_h': 'Email Us',
      'contact.send_email': 'Send an Email',
      'contact.call_h': 'Call Us',
      'contact.call_now': 'Call Now',
      'contact.form_badge': 'Send a Message',
      'contact.form_title_html': 'Drop us a <span class="text-royal">line</span>',
      'contact.form_lead': 'Fill in the form and a member of our team will get back to you soon.',
      'contact.send_message': 'Send Message',

      /* ---------- New Here ---------- */
      'newhere.badge': 'New Here',
      'newhere.title_html': "Welcome — let's help <span class=\"italic text-gold\">you belong</span>",
      'newhere.lead': "Wherever you are on your journey of faith, there's a next step for you here — grow through Foundation School, find family in a Cell, and discover the joy of serving.",
      'fs.badge': 'Grow Your Foundation',
      'fs.title_html': 'Foundation <span class="text-royal">School</span>',
      'fs.lead': "Foundation School equips believers with a solid foundation in God's Word, helping them understand their identity in Christ, grow spiritually, and become effective in ministry, evangelism, and service in the local church.",
      'fs.enroll': 'Enroll Now',
      'cell.badge': 'Find Your Family',
      'cell.title_html': 'Join a <span class="italic text-gold">Cell</span>',
      'cell.p1': "The Cell Ministry is the heartbeat of our church — small, close-knit groups that gather through the week for fellowship, the study of God's Word, prayer, and genuine care for one another. It's where no one is just a face in the crowd. In a cell you'll be known, encouraged, and helped to grow and mature in your walk with Christ.",
      'cell.p2': "Every member belongs, every member contributes, and together we supply to the growth of the Church. There's a cell near you — come and belong.",
      'cell.join': 'Join a Cell',
      'serve.badge': 'Use Your Gifts',
      'serve.title_html': "There's a place for <span class=\"text-royal\">you to serve</span>",
      'serve.lead': "Some of the greatest moments of your life will happen when you give yourself to something bigger than you. Serving in the house of God is a joy and a privilege — it's where your gifts come alive, your faith grows, and lasting friendships are built. Don't just attend — get involved! Jump in, join a department, and let's build something glorious together.",
      'serve.join': 'Join a Department',

      /* ---------- Connect (forms) ---------- */
      'connect.badge': 'Connect',
      'connect.title_html': 'Take your <span class="italic text-gold">next step</span>',
      'connect.lead': "Whether you're visiting for the first time, joining a cell, enrolling in Foundation School, or stepping in to serve — fill in the form and our team will reach out to you.",
      'connect.tab_first': 'First Timers',
      'connect.tab_cell': 'Join a Cell',
      'connect.tab_fs': 'Foundation School',
      'connect.tab_dept': 'Join a Department',
      'connect.first_h': 'Welcome — tell us about you',
      'connect.first_p': "We're so glad you're here. Share your details and we'll follow up to welcome you personally.",
      'connect.cell_h': 'Join a Cell',
      'connect.cell_p': "Find your family in a small group near you. Tell us where you are and we'll connect you to a cell.",
      'connect.fs_h': 'Foundation School Enrollment',
      'connect.fs_p': "Build a solid foundation in God's Word. Enroll below and we'll share the class schedule with you.",
      'connect.dept_h': 'Join a Department',
      'connect.dept_p': "Put your gifts to work in the house of God. Let us know where you'd love to serve.",

      /* ---------- Shared form labels / options ---------- */
      'form.fullname': 'Full Name',
      'form.phone': 'Phone',
      'form.email': 'Email',
      'form.email_addr': 'Email Address',
      'form.phone_number': 'Phone Number',
      'form.message': 'Message',
      'form.optional': '(optional)',
      'form.comments': 'Comments',
      'form.select_one': 'Select one…',
      'form.heard': 'How did you hear about us?',
      'form.heard_friend': 'Friend or family',
      'form.heard_social': 'Social media',
      'form.heard_flyer': 'Flyer or invite',
      'form.heard_walkin': 'Walked in',
      'form.heard_other': 'Other',
      'form.first_date': 'Date of first visit',
      'form.prayer': 'Prayer request / comments',
      'form.ph_jane': 'Jane Doe',
      'form.ph_pray': 'How can we pray with you?',
      'form.ph_pray_contact': 'How can we pray with you or help you today?',
      'form.ph_area': 'e.g. Cedar Hill, Red Bird…',
      'form.ph_know': "Anything you'd like us to know?",
      'form.ph_questions': 'Any questions for us?',
      'form.ph_passion': 'Tell us what stirs your heart to serve…',
      'form.area': 'Area / neighborhood of residence',
      'form.sched': 'Preferred class schedule',
      'form.sched_sun': 'Sunday',
      'form.sched_mid': 'Midweek',
      'form.sched_either': 'Either',
      'form.bornagain': 'Are you born again?',
      'form.yes': 'Yes',
      'form.no': 'No',
      'form.contact_phone': 'Contact (phone)',
      'form.department': 'Department',
      'form.select_dept': 'Select a department…',
      'form.dept_choir': 'Choir',
      'form.dept_media': 'Media',
      'form.dept_ushering': 'Ushering',
      'form.dept_hospitality': 'Hospitality',
      'form.passion': 'What are you passionate about?',
      'form.submit': 'Submit',
      'form.enroll': 'Enroll',

      /* ---------- JS-generated messages ---------- */
      'msg.sending': 'Sending…',
      'msg.need_name': 'Please enter your name.',
      'msg.need_email': 'Please enter a valid email address.',
      'msg.need_message': 'Please enter a message.',
      'msg.need_name_phone': 'Please enter your name and phone number.',
      'msg.email_or_blank': 'Please enter a valid email address (or leave it blank).',
      'msg.contact_thanks': "Thank you — we'll be in touch soon!",
      'msg.generic_error': 'Something went wrong. Please try again.',
      'msg.network_error': 'Network error. Please check your connection and try again.',
      'msg.allset': "You're all set",
      'msg.allset_done': 'Thank you — our team has your details and will reach out to you soon.'
    },

    es: {
      /* ---------- Shared nav + footer ---------- */
      'nav.home': 'Inicio',
      'nav.events': 'Eventos',
      'nav.newhere': 'Nuevo Aquí',
      'nav.connect': 'Conéctate',
      'nav.giving': 'Donaciones',
      'nav.contact': 'Contacto',
      'nav.plan_visit': 'Planifica tu Visita',
      'footer.tagline': 'Una iglesia de LoveWorld Nation en Duncanville, Texas — sirviendo a Cedar Hill, DeSoto, Lancaster y el área metropolitana de Dallas. Dondequiera que estés en tu camino de fe, aquí perteneces.',
      'footer.quicklinks': 'Enlaces Rápidos',
      'footer.contact_h': 'Contacto',
      'footer.location_h': 'Ubicación',
      'footer.service_times': 'Horarios de Servicio',
      'footer.services_html': 'Dom · 10:00 AM<br>Mié · 6:30 PM',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.affiliation': "Afiliada a Believers' LoveWorld Incorporated.",

      /* ---------- Home ---------- */
      'hero.badge': 'Bienvenido a Christ Embassy Duncanville',
      'hero.title_html': 'Aquí <span class="italic text-gold">Perteneces</span>',
      'hero.lead': 'Una familia amorosa en el corazón de Duncanville, Texas — donde eres visto, conocido y recibido como en casa. Ven tal como eres y descubre tu propósito en Cristo.',
      'hero.cta_visit': 'Planifica tu Visita',
      'hero.cta_watch': 'Míranos en Línea',
      'hero.scroll': 'Ver',
      'mission.badge': 'Quiénes Somos',
      'mission.title_html': 'Arraigados en amor, <span class="text-royal">alcanzando la ciudad</span>',
      'mission.lead': 'Somos una familia de LoveWorld Nation en Duncanville, Texas — apasionados por Dios y dedicados a las personas que Él nos ha llamado a alcanzar. Esto es lo que impulsa todo lo que hacemos.',
      'mission.mission_h': 'Nuestra Misión',
      'mission.mission_b': 'Levantar generaciones de hombres y mujeres que entren en su herencia en Cristo, cumplan su propósito y lleguen a ser testigos eficaces.',
      'mission.vision_h': 'Nuestra Visión',
      'mission.vision_b': 'Llevar la presencia divina de Dios a los pueblos y naciones del mundo, y demostrar el carácter del Espíritu Santo.',
      'beliefs.badge': 'Lo Que Creemos',
      'beliefs.title_html': 'El fundamento <span class="italic text-gold">de nuestra fe</span>',
      'beliefs.lead': 'Diez verdades en el corazón de todo lo que enseñamos y vivimos.',
      'leadership.badge': 'Nuestro Liderazgo',
      'leadership.title_html': 'Pastores con un <span class="text-royal">corazón para ti</span>',
      'leadership.lead': 'Conoce a los hombres y mujeres que sirven y guían con amor a nuestra familia de iglesia.',

      /* ---------- Events ---------- */
      'events.badge': 'Próximos Eventos',
      'events.title_html': 'Sé parte de lo que <span class="italic text-gold">Dios está haciendo</span>',
      'events.lead': 'Reúnete con nosotros en estos servicios y cruzadas especiales. Ven con expectativa — cada reunión es un encuentro con la presencia y el poder de Dios.',
      'events.upcoming': 'Próximo',
      'events.register': 'Regístrate',
      'events.details': 'Ver Detalles',
      'events.directions': 'Cómo Llegar',
      'events.e2_date': 'Vie 24 – Dom 26 de julio de 2026 · 8:00 AM CST',
      'events.e2_loc': 'En vivo en línea y en Christ Embassy Duncanville',
      'events.e2_desc': 'Un servicio de sanidad global con el Pastor Chris. Acompáñanos en vivo mientras los enfermos son sanados y las vidas son restauradas por el poder de Dios.',
      'events.e3_date': 'Sáb 4 de julio de 2026',
      'events.e3_loc': '100 James Collins Blvd, Duncanville, TX 75116',
      'events.e3_desc': 'ReachOut World USA es una poderosa campaña global de evangelismo organizada por LoveWorld Incorporated (Christ Embassy), dedicada a distribuir Rhapsody of Realities y compartir el Evangelio con personas de todo el mundo. Mientras Estados Unidos celebra su aniversario número 250 este año, tenemos una oportunidad especial el 4 de julio para alcanzar a nuestras comunidades con el amor de Cristo. ¿Qué mejor manera de celebrar nuestra nación que difundiendo esperanza, fe y el amor de Dios a quienes nos rodean? ¡Únete a nosotros mientras impactamos vidas, una a la vez!',

      /* ---------- Giving ---------- */
      'giving.badge': 'Donaciones',
      'giving.title_html': 'Asóciate con <span class="italic text-gold">la visión</span>',
      'giving.lead': 'Tu generosidad ayuda a llevar el evangelio a Duncanville y más allá. Da de forma segura en línea en un momento.',
      'giving.give_h': 'Da de forma segura en línea',
      'giving.give_b': 'Haz una donación única o configura donaciones recurrentes a continuación. Tu transacción es procesada de forma segura por Tithely.',
      'giving.fallback': '¿Tienes problemas con el formulario?',
      'giving.fallback_link': 'Dona directamente en Tithely →',
      'giving.help': '¿Prefieres dar de otra manera o tienes una pregunta?',
      'giving.contact_btn': 'Contacta a nuestro equipo',

      /* ---------- Contact ---------- */
      'contact.badge': 'Ponte en Contacto',
      'contact.title_html': 'Nos encantaría <span class="italic text-gold">saber de ti</span>',
      'contact.lead': 'Visítanos este domingo, envía un mensaje o contáctanos en cualquier momento — nuestra familia está aquí para ti.',
      'contact.visit_h': 'Visítanos',
      'contact.directions': 'Cómo Llegar',
      'contact.email_h': 'Escríbenos',
      'contact.send_email': 'Enviar un Correo',
      'contact.call_h': 'Llámanos',
      'contact.call_now': 'Llamar Ahora',
      'contact.form_badge': 'Envía un Mensaje',
      'contact.form_title_html': 'Escríbenos una <span class="text-royal">línea</span>',
      'contact.form_lead': 'Completa el formulario y un miembro de nuestro equipo te responderá pronto.',
      'contact.send_message': 'Enviar Mensaje',

      /* ---------- New Here ---------- */
      'newhere.badge': 'Nuevo Aquí',
      'newhere.title_html': 'Bienvenido — déjanos ayudarte a <span class="italic text-gold">pertenecer</span>',
      'newhere.lead': 'Dondequiera que estés en tu camino de fe, aquí hay un siguiente paso para ti — crece en la Escuela de Fundamento, encuentra familia en una Célula y descubre el gozo de servir.',
      'fs.badge': 'Edifica tu Fundamento',
      'fs.title_html': 'Escuela de <span class="text-royal">Fundamento</span>',
      'fs.lead': 'La Escuela de Fundamento equipa a los creyentes con una base sólida en la Palabra de Dios, ayudándoles a entender su identidad en Cristo, crecer espiritualmente y ser eficaces en el ministerio, la evangelización y el servicio en la iglesia local.',
      'fs.enroll': 'Inscríbete Ahora',
      'cell.badge': 'Encuentra tu Familia',
      'cell.title_html': 'Únete a una <span class="italic text-gold">Célula</span>',
      'cell.p1': 'El Ministerio de Células es el corazón de nuestra iglesia — grupos pequeños y unidos que se reúnen durante la semana para la comunión, el estudio de la Palabra de Dios, la oración y el cuidado genuino de unos por otros. Es donde nadie es solo un rostro más en la multitud. En una célula serás conocido, animado y ayudado a crecer y madurar en tu caminar con Cristo.',
      'cell.p2': 'Cada miembro pertenece, cada miembro contribuye y juntos aportamos al crecimiento de la Iglesia. Hay una célula cerca de ti — ven y perteneces.',
      'cell.join': 'Únete a una Célula',
      'serve.badge': 'Usa tus Dones',
      'serve.title_html': 'Hay un lugar para <span class="text-royal">que sirvas</span>',
      'serve.lead': 'Algunos de los mejores momentos de tu vida sucederán cuando te entregues a algo más grande que tú. Servir en la casa de Dios es un gozo y un privilegio — es donde tus dones cobran vida, tu fe crece y se forjan amistades duraderas. No solo asistas — ¡involúcrate! Únete, sé parte de un departamento y construyamos juntos algo glorioso.',
      'serve.join': 'Únete a un Departamento',

      /* ---------- Connect (forms) ---------- */
      'connect.badge': 'Conéctate',
      'connect.title_html': 'Da tu <span class="italic text-gold">siguiente paso</span>',
      'connect.lead': 'Ya sea que nos visites por primera vez, te unas a una célula, te inscribas en la Escuela de Fundamento o des un paso para servir — completa el formulario y nuestro equipo se pondrá en contacto contigo.',
      'connect.tab_first': 'Primera Vez',
      'connect.tab_cell': 'Únete a una Célula',
      'connect.tab_fs': 'Escuela de Fundamento',
      'connect.tab_dept': 'Únete a un Departamento',
      'connect.first_h': 'Bienvenido — cuéntanos sobre ti',
      'connect.first_p': 'Nos alegra mucho que estés aquí. Comparte tus datos y te daremos seguimiento para darte la bienvenida personalmente.',
      'connect.cell_h': 'Únete a una Célula',
      'connect.cell_p': 'Encuentra tu familia en un grupo pequeño cerca de ti. Dinos dónde estás y te conectaremos con una célula.',
      'connect.fs_h': 'Inscripción a la Escuela de Fundamento',
      'connect.fs_p': 'Edifica una base sólida en la Palabra de Dios. Inscríbete abajo y te compartiremos el horario de clases.',
      'connect.dept_h': 'Únete a un Departamento',
      'connect.dept_p': 'Pon tus dones a trabajar en la casa de Dios. Dinos dónde te encantaría servir.',

      /* ---------- Shared form labels / options ---------- */
      'form.fullname': 'Nombre Completo',
      'form.phone': 'Teléfono',
      'form.email': 'Correo Electrónico',
      'form.email_addr': 'Correo Electrónico',
      'form.phone_number': 'Número de Teléfono',
      'form.message': 'Mensaje',
      'form.optional': '(opcional)',
      'form.comments': 'Comentarios',
      'form.select_one': 'Selecciona una…',
      'form.heard': '¿Cómo supiste de nosotros?',
      'form.heard_friend': 'Amigo o familiar',
      'form.heard_social': 'Redes sociales',
      'form.heard_flyer': 'Volante o invitación',
      'form.heard_walkin': 'Llegué por mi cuenta',
      'form.heard_other': 'Otro',
      'form.first_date': 'Fecha de primera visita',
      'form.prayer': 'Petición de oración / comentarios',
      'form.ph_jane': 'Juana Pérez',
      'form.ph_pray': '¿Cómo podemos orar contigo?',
      'form.ph_pray_contact': '¿Cómo podemos orar contigo o ayudarte hoy?',
      'form.ph_area': 'p. ej. Cedar Hill, Red Bird…',
      'form.ph_know': '¿Algo que quieras que sepamos?',
      'form.ph_questions': '¿Alguna pregunta para nosotros?',
      'form.ph_passion': 'Cuéntanos qué mueve tu corazón a servir…',
      'form.area': 'Área / vecindario de residencia',
      'form.sched': 'Horario de clase preferido',
      'form.sched_sun': 'Domingo',
      'form.sched_mid': 'Entre semana',
      'form.sched_either': 'Cualquiera',
      'form.bornagain': '¿Has nacido de nuevo?',
      'form.yes': 'Sí',
      'form.no': 'No',
      'form.contact_phone': 'Contacto (teléfono)',
      'form.department': 'Departamento',
      'form.select_dept': 'Selecciona un departamento…',
      'form.dept_choir': 'Coro',
      'form.dept_media': 'Medios',
      'form.dept_ushering': 'Ujieres',
      'form.dept_hospitality': 'Hospitalidad',
      'form.passion': '¿Qué te apasiona?',
      'form.submit': 'Enviar',
      'form.enroll': 'Inscribirme',

      /* ---------- JS-generated messages ---------- */
      'msg.sending': 'Enviando…',
      'msg.need_name': 'Por favor ingresa tu nombre.',
      'msg.need_email': 'Por favor ingresa un correo electrónico válido.',
      'msg.need_message': 'Por favor ingresa un mensaje.',
      'msg.need_name_phone': 'Por favor ingresa tu nombre y número de teléfono.',
      'msg.email_or_blank': 'Por favor ingresa un correo electrónico válido (o déjalo en blanco).',
      'msg.contact_thanks': '¡Gracias — nos pondremos en contacto pronto!',
      'msg.generic_error': 'Algo salió mal. Por favor inténtalo de nuevo.',
      'msg.network_error': 'Error de red. Por favor revisa tu conexión e inténtalo de nuevo.',
      'msg.allset': '¡Todo listo',
      'msg.allset_done': 'Gracias — nuestro equipo tiene tus datos y se pondrá en contacto contigo pronto.'
    }
  };

  var STORAGE_KEY = 'ced-lang';
  var lang = 'en';
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') lang = saved;
  } catch (e) { /* localStorage unavailable */ }

  function t(key) {
    var table = DICT[lang] || DICT.en;
    if (table[key] != null) return table[key];
    if (DICT.en[key] != null) return DICT.en[key];
    return key;
  }

  function applyLang(next) {
    lang = (next === 'es') ? 'es' : 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // Toggle button active state (works across the desktop + mobile toggles).
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('bg-gold', on);
      btn.classList.toggle('text-ink', on);
      btn.classList.toggle('shadow-gold', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    window.dispatchEvent(new CustomEvent('cedlangchange', { detail: { lang: lang } }));
  }

  function setLang(next) {
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    applyLang(next);
  }

  // Public API for page scripts (beliefs, leaders, form messages, …).
  window.CED_I18N = { t: t, getLang: function () { return lang; }, setLang: setLang };

  // Wire the toggle buttons rendered by site.js.
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
  });

  // Apply the saved/default language now that the DOM (incl. nav/footer) exists.
  applyLang(lang);
})();
