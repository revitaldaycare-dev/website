(function() {
  "use strict";
  var BASE = "https://revitaldaycare.com";
  var path = location.pathname.split("/").pop() || "index.html";

  var childcare = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    "@id": BASE + "/#childcare",
    "name": "Revital Daycare",
    "alternateName": "Revital Preschool",
    "url": BASE,
    "logo": BASE + "/images/og-image.png",
    "image": BASE + "/images/og-image.png",
    "telephone": "+1-818-943-5983",
    "email": "revitaldaycare@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "20628 Londelius St",
      "addressLocality": "Winnetka",
      "addressRegion": "CA",
      "postalCode": "91306",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.2290264,
      "longitude": -118.5828195
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "06:30",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "6",
      "bestRating": "5"
    },
    "founder": {
      "@type": "Person",
      "name": "Revital Edry"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Revital Edry",
        "jobTitle": "Teacher & Founder"
      },
      {
        "@type": "Person",
        "name": "Itamar Nadjar",
        "jobTitle": "Assistant"
      }
    ],
    "sameAs": [
      "https://www.google.com/maps/place/Revital+Daycare/@34.2290264,-118.5828195,17z/"
    ],
    "areaServed": [
      {"@type":"City","name":"Winnetka"},
      {"@type":"City","name":"Canoga Park"},
      {"@type":"City","name":"Woodland Hills"},
      {"@type":"City","name":"Chatsworth"}
    ]
  };

  var schemas = [];

  if (path === "index.html" || path === "") {
    schemas.push(childcare);
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type":"Question","name":"What ages does Revital Daycare serve?","acceptedAnswer":{"@type":"Answer","text":"We serve children ages 3 through 5 years with dedicated preschool (ages 3-4) and Pre-K (ages 4-5) programs."}},
        {"@type":"Question","name":"What is your child-to-staff ratio?","acceptedAnswer":{"@type":"Answer","text":"We maintain a 6:1 child-to-staff ratio in our preschool programs, ensuring personalized attention for every child."}},
        {"@type":"Question","name":"What are your hours of operation?","acceptedAnswer":{"@type":"Answer","text":"We are open Monday through Friday, 6:30 AM to 6:00 PM. We are closed on weekends and major holidays."}},
        {"@type":"Question","name":"What is included in your curriculum?","acceptedAnswer":{"@type":"Answer","text":"Our programs include academics, arts, music, outdoor play, and social-emotional learning tailored to each age group."}},
        {"@type":"Question","name":"Do you offer flexible scheduling?","acceptedAnswer":{"@type":"Answer","text":"Yes, we offer full-time (5 days/week) and part-time (3 days/week) enrollment. We also offer flexible drop-in care when space is available."}}
      ]
    });
  } else if (path === "program.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/program#webpage","name":"Preschool & Pre-K Programs | Revital Daycare","description":"Explore our preschool and pre-K programs for ages 3-5 in Winnetka, CA.","url":BASE+"/program.html","isPartOf":{"@id":BASE+"/#childcare"},"mainEntity":{"@id":BASE+"/#childcare"}},
        childcare
      ]
    });
  } else if (path === "contact.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/contact#webpage","name":"Contact Revital Daycare","description":"Contact Revital Daycare in Winnetka, CA to schedule a tour or ask about enrollment","url":BASE+"/contact.html","isPartOf":{"@id":BASE+"/#childcare"},"mainEntity":{"@id":BASE+"/#childcare"}},
        childcare
      ]
    });
  } else if (path === "faq.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/faq#webpage","name":"FAQ | Revital Daycare","description":"Frequently asked questions about Revital Daycare in Winnetka, CA.","url":BASE+"/faq.html"},
        {"@type":"FAQPage","mainEntity":[
          {"@type":"Question","name":"What are your hours of operation?","acceptedAnswer":{"@type":"Answer","text":"We are open Monday through Friday, 6:30 AM to 6:00 PM. We are closed on weekends and major holidays."}},
          {"@type":"Question","name":"What ages do you serve?","acceptedAnswer":{"@type":"Answer","text":"We serve children ages 3 through 5 years, with dedicated preschool (3-4) and Pre-K (4-5) programs."}},
          {"@type":"Question","name":"How do I schedule a tour?","acceptedAnswer":{"@type":"Answer","text":"Contact us via phone, email, or the form on our contact page. We offer tours by appointment throughout the week."}},
          {"@type":"Question","name":"What is your child-to-staff ratio?","acceptedAnswer":{"@type":"Answer","text":"We maintain a 6:1 child-to-staff ratio in our preschool programs, ensuring personalized attention for every child."}},
          {"@type":"Question","name":"Do you offer flexible scheduling?","acceptedAnswer":{"@type":"Answer","text":"Yes, we offer full-time (5 days/week) and part-time (3 days/week) enrollment. We also offer flexible drop-in care when space is available. Contact us to discuss which option works best for your schedule."}},
          {"@type":"Question","name":"What is included in your curriculum?","acceptedAnswer":{"@type":"Answer","text":"Our programs include academics, arts, music, outdoor play, and social-emotional learning tailored to each age group."}}
        ]}
      ]
    });
  } else if (path === "about.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/about#webpage","name":"About Revital Daycare","description":"Learn about Revital Daycare in Winnetka, CA. Founded by Revital Edry with 10 years of experience in early childhood education.","url":BASE+"/about.html"},
        childcare
      ]
    });
  } else if (path === "environment.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/environment#webpage","name":"Our Environment | Revital Daycare","description":"Explore our safe, nurturing environment at Revital Daycare in Winnetka, CA.","url":BASE+"/environment.html"},
        childcare
      ]
    });
  } else if (path === "parent-reviews.html") {
    schemas.push({
      "@context": "https://schema.org",
      "@graph": [
        {"@type":"WebPage","@id":BASE+"/parent-reviews#webpage","name":"Parent Reviews | Revital Daycare","description":"See what parents are saying about Revital Daycare in Winnetka, CA.","url":BASE+"/parent-reviews.html"},
        childcare,
        {"@type":"ItemList","itemListElement":[
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"Sarah Mitchell"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Revital has been wonderful for our daughter. The staff is caring and attentive, and we love seeing how much she's grown!"},
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"David Kim"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"My son looks forward to coming to daycare every day. The activities are creative and the communication with parents is excellent."},
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"Jennifer Lopez"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Professional, clean facility with staff who genuinely care about the children. Highly recommended to any family in Winnetka!"},
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"Maria Santos"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Revital truly cares about each child as an individual. My daughter's confidence has blossomed here."},
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"Robert Chen"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"The communication is fantastic — daily photos and updates through their app make us feel connected to our son's day."},
          {"@type":"Review","itemReviewed":{"@id":BASE+"/#childcare"},"author":{"@type":"Person","name":"Amanda Rodriguez"},"reviewRating":{"@type":"Rating","ratingValue":"5"},"reviewBody":"Our son went from shy to confident in just a few months. The teachers are patient and kind."}
        ]}
      ]
    });
  }

  var breadcrumbMap = {
    "index.html": null,
    "program.html": {"Home":"/","Program":null},
    "contact.html": {"Home":"/","Contact":null},
    "faq.html": {"Home":"/","FAQ":null},
    "about.html": {"Home":"/","About":null},
    "environment.html": {"Home":"/","Environment":null},
    "parent-reviews.html": {"Home":"/","Reviews":null}
  };

  var crumbs = breadcrumbMap[path];
  if (crumbs) {
    var items = [];
    var pos = 1;
    for (var name in crumbs) {
      items.push({"@type":"ListItem","position":pos,"name":name,"item": crumbs[name] ? BASE + crumbs[name] : undefined});
      pos++;
    }
    schemas.push({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items});
  }

  for (var i = 0; i < schemas.length; i++) {
    var el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schemas[i]);
    document.head.appendChild(el);
  }
})();
