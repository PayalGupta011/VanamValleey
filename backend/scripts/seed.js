require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Property = require("../models/Property");
const WebsiteSettings = require("../models/WebsiteSettings");

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    // 1. Seed Default Admin if none exists
    const existingAdmin = await Admin.findOne({ email: "admin@vanamvalley.com" });
    if (!existingAdmin) {
      await Admin.create({
        username: "admin",
        email: "admin@vanamvalley.com",
        passwordHash: "Vanam@2026!", // Pre-save hook hashes this
        role: "superadmin",
      });
      console.log("Default admin created: admin@vanamvalley.com / Vanam@2026!");
    } else {
      console.log("Admin account already exists.");
    }

    // 2. Seed Website Settings with brochure facts
    const existingSettings = await WebsiteSettings.findOne({ siteKey: "main" });
    const defaultSettings = {
      siteKey: "main",
      logo: {
        url: "/src/assets/logo.png",
        alt: "Vanam Valley — Balaghat M.P.",
      },
      navbar: {
        phone: "+91 98765 43210",
        links: [
          { label: "Home", href: "/", order: 1 },
          { label: "Properties", href: "/properties", order: 2 },
          { label: "Locations", href: "/locations", order: 3 },
          { label: "Calculators", href: "/calculators", order: 4 },
          { label: "About Us", href: "/about", order: 5 },
          { label: "Gallery", href: "/gallery", order: 6 },
          { label: "Contact Us", href: "/contact", order: 7 },
        ],
      },
      hero: {
        title: "Luxury Forest Living in Balaghat",
        subtitle:
          "Experience nature-inspired 3 BHK villas and residential plots nestled in the pristine woodlands of Madhya Pradesh.",
        ctaPrimary: {
          text: "Explore Villas & Plots",
          link: "/properties",
        },
        ctaSecondary: {
          text: "Enquire Now",
          link: "/contact",
        },
        images: [
          {
            url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
            alt: "Vanam Valley Luxury Forest Villa",
          },
        ],
      },
      about: {
        title: "The Sanctuary of Green Elegance",
        description:
          "Vanam Valley is an exclusive eco-luxury forest living master-planned development in Balaghat, Madhya Pradesh. Designed with nature as its architectural canvas, the development encompasses 129 signature 3 BHK luxury villas and premium residential plots, combining undisturbed wilderness with world-class hospitality and recreational amenities.",
        vision:
          "To provide discerning homeowners an authentic retreat into nature without compromising on architectural luxury, modern connectivity, and holistic wellbeing.",
        highlights: [
          "129 Exclusive 3 BHK Luxury Forest Villas",
          "Eco-sensitive Master Planning in Pristine Balaghat Woodlands",
          "Unmatched proximity to Pench & Kanha National Parks",
          "World-class Clubhouse, Spa, and Sports Amenities",
        ],
      },
      amenities: [
        {
          title: "Infinity Forest Pool",
          description: "Panoramic swimming pool overlooking virgin woodland canopy.",
          icon: "Waves",
        },
        {
          title: "Executive Mini Golf",
          description: "Meticulously landscaped putting green for leisurely afternoons.",
          icon: "Flag",
        },
        {
          title: "Spa & Meditation Pavilion",
          description: "Holistic ayurvedic wellness sanctuaries designed amidst peaceful forest groves.",
          icon: "Sparkles",
        },
        {
          title: "Clubhouse & Fine Dining",
          description: "Gourmet multi-cuisine restaurant celebrating organic regional produce.",
          icon: "Utensils",
        },
        {
          title: "Fitness Center & Sports",
          description: "Modern gym facilities and outdoor sports courts tailored for active living.",
          icon: "Dumbbell",
        },
        {
          title: "Nature & Jogging Trails",
          description: "Paved ecological walkways connecting serene waterways and forest copses.",
          icon: "Footprints",
        },
      ],
      locationHighlights: [
        {
          name: "Gangrel Waterfall",
          description: "Mesmerizing cascades and perennial nature picnic destination.",
          distance: "Nearby",
        },
        {
          name: "Sonewani Wildlife Sanctuary",
          description: "Abundant indigenous flora and fauna sanctuary in Balaghat district.",
          distance: "Short Drive",
        },
        {
          name: "Pench National Park",
          description: "World-renowned tiger reserve inspiring Kipling's Jungle Book.",
          distance: "Convenient Access",
        },
        {
          name: "Kanha National Park",
          description: "One of Asia's finest protected forest reserves and wildlife havens.",
          distance: "Accessible Gateway",
        },
      ],
      contact: {
        phone: "+91 98765 43210",
        email: "info@vanamvalley.com",
        address: "Vanam Valley Development, Balaghat, Madhya Pradesh 481001, India",
        mapEmbedUrl: "",
        socialLinks: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          youtube: "https://youtube.com",
        },
      },
      footer: {
        description:
          "Vanam Valley — Balaghat, M.P. An exclusive sanctuary of 129 luxury forest villas and premium residential plots enveloped in nature's purest embrace.",
        copyright: "© 2026 Vanam Valley. All rights reserved.",
      },
      seo: {
        siteTitle: "Vanam Valley — Luxury Forest Villas & Plots in Balaghat, MP",
        siteDescription:
          "Discover 129 signature 3 BHK luxury villas & residential plots in Balaghat, Madhya Pradesh. Eco-luxury nature living near Pench and Kanha.",
      },
    };

    if (!existingSettings) {
      await WebsiteSettings.create(defaultSettings);
      console.log("Default website settings seeded.");
    } else {
      await WebsiteSettings.updateOne({ siteKey: "main" }, { $set: defaultSettings });
      console.log("Website settings updated with verified brochure content.");
    }

    // 3. Seed Properties if none exist
    const countProps = await Property.countDocuments();
    if (countProps === 0) {
      const sampleProperties = [
        {
          title: "The Banyan 3 BHK Signature Villa",
          slug: "the-banyan-3-bhk-signature-villa",
          description:
            "A thoughtfully crafted 3 BHK luxury forest villa featuring expansive glass facades, double-height living areas, private deck, and indigenous landscape gardens. Built with sustainable natural stone and wood accents.",
          propertyType: "villa",
          configuration: "3 BHK Luxury Villa",
          plotArea: { value: 2400, unit: "sq ft" },
          builtUpArea: { value: 1850, unit: "sq ft" },
          price: 0,
          priceDisplay: "Price on Request",
          location: {
            area: "Woodland Enclave",
            city: "Balaghat",
            state: "Madhya Pradesh",
          },
          amenities: [
            "Private Sundeck",
            "Panoramic Forest Views",
            "Double Height Living",
            "Covered Car Parking",
            "Solar Power Ready",
            "Rainwater Harvesting",
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
              alt: "The Banyan Villa Exterior",
              isPrimary: true,
            },
            {
              url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
              alt: "Villa Living Room",
              isPrimary: false,
            },
          ],
          status: "available",
          isPublished: true,
          featured: true,
          highlights: [
            "Part of 129 Exclusive Master-Planned Villas",
            "Direct views of green canopy",
            "Vastu-compliant architecture",
          ],
        },
        {
          title: "The Teak 3 BHK Forest Villa",
          slug: "the-teak-3-bhk-forest-villa",
          description:
            "Spacious contemporary 3 BHK forest home boasting serene courtyards, open-concept kitchen, and master bedroom with open-sky forest bath concept.",
          propertyType: "villa",
          configuration: "3 BHK Forest Villa",
          plotArea: { value: 2200, unit: "sq ft" },
          builtUpArea: { value: 1700, unit: "sq ft" },
          price: 0,
          priceDisplay: "Price on Request",
          location: {
            area: "Orchard Ridge",
            city: "Balaghat",
            state: "Madhya Pradesh",
          },
          amenities: [
            "Courtyard Garden",
            "Master Forest Bath",
            "Modern Kitchen",
            "Private Terrace",
          ],
          images: [
            {
              url: "/villa_teak_living.jpg",
              alt: "The Teak 3 BHK Forest Villa Panoramic Interior",
              isPrimary: true,
            },
            {
              url: "/curved_villa_hero.jpg",
              alt: "The Teak 3 BHK Forest Villa Architecture",
              isPrimary: false,
            },
          ],
          status: "available",
          isPublished: true,
          featured: true,
          highlights: [
            "Quiet interior location",
            "Nature-integrated design",
          ],
        },
        {
          title: "Canopy Crest Estate Plot",
          slug: "canopy-crest-estate-plot",
          description:
            "Demarcated luxury residential plot with underground cabling, water connection, and clear title, primed for custom villa construction within the gated sanctuary.",
          propertyType: "plot",
          configuration: "Residential Forest Plot",
          plotArea: { value: 3000, unit: "sq ft" },
          builtUpArea: { value: 0, unit: "sq ft" },
          price: 0,
          priceDisplay: "Price on Request",
          location: {
            area: "Hillside Meadow",
            city: "Balaghat",
            state: "Madhya Pradesh",
          },
          amenities: [
            "Underground Utilities",
            "Gated Boundary",
            "Tree-lined Access",
            "24/7 Security",
          ],
          images: [
            {
              url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
              alt: "Canopy Crest Estate Plot Landscape",
              isPrimary: true,
            },
          ],
          status: "available",
          isPublished: true,
          featured: false,
          highlights: [
            "100% Freehold clear title",
            "Immediate possession ready for construction",
          ],
        },
      ];

      await Property.insertMany(sampleProperties);
      console.log("Sample brochure properties seeded successfully.");
    } else {
      console.log(`Database already has ${countProps} properties.`);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();

