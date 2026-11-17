const mongoose = require("mongoose");

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteKey: {
      type: String,
      default: "main",
      unique: true,
    },
    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
      alt: { type: String, default: "Vanam Valley" },
    },
    navbar: {
      phone: { type: String, default: "" },
      links: [
        {
          label: { type: String },
          href: { type: String },
          order: { type: Number, default: 0 },
        },
      ],
    },
    hero: {
      title: {
        type: String,
        default: "Luxury Forest Living in Balaghat",
      },
      subtitle: {
        type: String,
        default:
          "Discover nature-inspired homes nestled in the heart of Madhya Pradesh's lush forests.",
      },
      ctaPrimary: {
        text: { type: String, default: "Explore Properties" },
        link: { type: String, default: "/properties" },
      },
      ctaSecondary: {
        text: { type: String, default: "Enquire Now" },
        link: { type: String, default: "/contact" },
      },
      images: [
        {
          url: { type: String },
          publicId: { type: String, default: "" },
          alt: { type: String, default: "" },
        },
      ],
    },
    about: {
      title: { type: String, default: "About Vanam Valley" },
      description: {
        type: String,
        default:
          "Vanam Valley is a premium luxury forest villa project in Balaghat, Madhya Pradesh, offering nature-inspired living amidst lush green forests.",
      },
      vision: { type: String, default: "" },
      highlights: [{ type: String }],
      images: [
        {
          url: { type: String },
          publicId: { type: String, default: "" },
          alt: { type: String, default: "" },
        },
      ],
    },
    amenities: [
      {
        title: { type: String },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        image: {
          url: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      },
    ],
    propertyOptions: {
      eyebrow: { type: String, default: "EXCLUSIVE TOWNSHIP PROPERTIES" },
      headingFirst: { type: String, default: "Explore Our" },
      headingSecond: { type: String, default: "Property Options" },
      description: {
        type: String,
        default:
          "From 100% freehold residential plots to master-crafted duplex forest villas, choose the ideal living space designed for comfort, luxury, and generational legacy.",
      },
      card1: {
        title: { type: String, default: "Duplex Villas" },
        spec: { type: String, default: "1,551 sq.ft. Built-up" },
        image: { type: String, default: "/properties_showcase/villa_arch_photo_new.jpg" },
      },
      card2: {
        title: { type: String, default: "Vanam Valley Township" },
        subtitle: { type: String, default: "Planned Eco-Township" },
        image: { type: String, default: "/properties_showcase/township_arch_photo_new.jpg" },
      },
      card3: {
        title: { type: String, default: "Residential Plots" },
        spec: { type: String, default: "1,200 – 3,500 sq.ft." },
        image: { type: String, default: "/properties_showcase/plots_arch_photo_new.jpg" },
      },
    },
    signatureProjects: {
      eyebrow: { type: String, default: "THE MASTER ENCLAVES" },
      heading: { type: String, default: "Signature Projects & Phases" },
      subtitle: {
        type: String,
        default:
          "Three distinct residential and wellness enclaves crafted in pure harmony with the surrounding forest.",
      },
      islandImage: {
        type: String,
        default: "/signature_projects/township_3d_island.png",
      },
      phase1: {
        title: { type: String, default: "Rengatolla Gara Plots" },
        spec: { type: String, default: "1.76 Acres" },
        description: {
          type: String,
          default:
            "Approved freehold plotted enclave nestled in Garra with modern infrastructure.",
        },
        image: { type: String, default: "/signature_projects/phase1_plots.jpg" },
      },
      phase2: {
        title: { type: String, default: "The Villa Reserve" },
        spec: { type: String, default: "1,551 Sq.Ft. | 3 BHK Duplex" },
        description: {
          type: String,
          default:
            "Master-crafted 3 BHK duplex villas designed with panoramic forest views and private terrace gardens.",
        },
        image: { type: String, default: "/signature_projects/phase2_villas.jpg" },
      },
      phase3: {
        title: { type: String, default: "The Canopy Club" },
        spec: { type: String, default: "15,000 Sq.Ft." },
        description: {
          type: String,
          default:
            "Luxury resort-inspired clubhouse featuring an infinity pool, wellness spa, banquet hall, and lounge.",
        },
        image: { type: String, default: "/signature_projects/phase3_club.jpg" },
      },
      leaf1: {
        value: { type: String, default: "27 Acres" },
        label: { type: String, default: "Master Forest Territory" },
      },
      leaf2: {
        value: { type: String, default: "129 Units" },
        label: { type: String, default: "3 BHK Duplex Residences" },
      },
      leaf3: {
        value: { type: String, default: "15,000 Sq.Ft." },
        label: { type: String, default: "Canopy Resort Clubhouse" },
      },
      leaf4: {
        value: { type: String, default: "100% Freehold" },
        label: { type: String, default: "Registry-Ready Clear Titles" },
      },
    },
    curatedAmenities: {
      eyebrow: { type: String, default: "RESORT-INSPIRED LIFESTYLE" },
      heading: { type: String, default: "World-Class Amenities & Features" },
      subtitle: {
        type: String,
        default:
          "Thoughtfully curated club, wellness, dining, and sports facilities designed to enrich life across every generation.",
      },
      clubhouseImage: {
        type: String,
        default: "/amenities/clubhouse_resort.jpg",
      },
      card1: {
        title: { type: String, default: "Club & Dining" },
        image: { type: String, default: "/amenities/dining_card.jpg" },
      },
      card2: {
        title: { type: String, default: "Swimming Pool" },
        image: { type: String, default: "/amenities/pool_card.jpg" },
      },
      card3: {
        title: { type: String, default: "Spa & Wellness" },
        image: { type: String, default: "/amenities/spa_card.jpg" },
      },
      clubDiningImage: { type: String, default: "/amenities_card1_dining_hd.jpg" },
      clubLoungeImage: { type: String, default: "/amenities/clubhouse_resort.jpg" },
      clubPrivateDiningImage: { type: String, default: "/amenities/dining_card.jpg" },
      yogaImage: { type: String, default: "/amenities_card3_spa_hd.jpg" },
      golfImage: { type: String, default: "/amenities/clubhouse_resort.jpg" },
      sportsCourtImage: { type: String, default: "/amenities/pool_card.jpg" },
      joggingTrackImage: { type: String, default: "/amenities/dining_card.jpg" },
      weddingLawnImage: { type: String, default: "/amenities/clubhouse_resort.jpg" },
      banquetHallImage: { type: String, default: "/amenities/dining_card.jpg" },
      amphitheatreImage: { type: String, default: "/amenities/spa_card.jpg" },
      roadsImage: { type: String, default: "/amenities/clubhouse_resort.jpg" },
      drainageImage: { type: String, default: "/amenities/pool_card.jpg" },
      securityImage: { type: String, default: "/amenities/dining_card.jpg" },
    },
    connectivityHighwayImage: {
      type: String,
      default: "/connectivity_highway_pristine.jpg",
    },
    locationHighlights: [
      {
        name: { type: String },
        description: { type: String, default: "" },
        distance: { type: String, default: "" },
        image: {
          url: { type: String, default: "" },
          publicId: { type: String, default: "" },
        },
      },
    ],
    contact: {
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      mapEmbedUrl: { type: String, default: "" },
      socialLinks: {
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        youtube: { type: String, default: "" },
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
      },
    },
    footer: {
      description: {
        type: String,
        default:
          "Vanam Valley — Luxury Forest Villas in Balaghat, Madhya Pradesh.",
      },
      links: [
        {
          label: { type: String },
          href: { type: String },
        },
      ],
      copyright: {
        type: String,
        default: "© 2026 Vanam Valley. All rights reserved.",
      },
    },
    seo: {
      siteTitle: {
        type: String,
        default: "Vanam Valley — Luxury Forest Villas in Balaghat, MP",
      },
      siteDescription: {
        type: String,
        default:
          "Discover luxury forest villas and residential plots in Balaghat, Madhya Pradesh. Nature-inspired living at Vanam Valley.",
      },
      ogImage: { type: String, default: "" },
    },
    documentChecklist: {
      title: {
        type: String,
        default: "Buyer's Legal & Registry Document Checklist",
      },
      subtitle: {
        type: String,
        default:
          "Complete list of essential identity, financial, and legal verification documents for seamless 100% freehold registry.",
      },
      contactAssistance: {
        type: String,
        default: "Need help preparing documents? Our legal desk assists you at every step.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteSettings", websiteSettingsSchema);

