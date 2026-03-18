import { readFile } from "node:fs/promises";
import path from "node:path";
import { legacyGallery } from "@/lib/data";

type GalleryManifestItem = {
  height: number;
  orientation: "landscape" | "portrait" | "square" | "unknown";
  sourceName: string;
  src: string;
  width: number;
};

export type LandingShowcaseImage = {
  alt: string;
  src: string;
  text: string;
  title: string;
};

export type LandingGalleryImage = {
  description: string;
  image: string;
  title: string;
};

type LandingGallery = {
  detailImage: string;
  galleryImages: LandingGalleryImage[];
  locationImage: string;
  showcaseImages: LandingShowcaseImage[];
};

const showcaseCopy = [
  {
    title: "Svetao i uredan enterijer",
    text: "Fotografije direktno iz objekta daju gostima jasniju sliku prostora i atmosfere."
  },
  {
    title: "Pripremljene sobe za boravak",
    text: "Na landing strani izdvajamo kadrove koji najbolje prenose cistocu, urednost i komfor."
  },
  {
    title: "Realan prikaz smestaja",
    text: "Bez stock materijala, sa autenticnim fotografijama soba i detalja iz objekta."
  }
] as const;

async function readClientGalleryManifest() {
  try {
    const manifestPath = path.join(
      process.cwd(),
      "public",
      "images",
      "client-gallery",
      "manifest.json"
    );
    const manifestContent = await readFile(manifestPath, "utf8");
    const parsedValue = JSON.parse(manifestContent) as GalleryManifestItem[];

    return parsedValue.filter((item) => Boolean(item?.src));
  } catch {
    return [];
  }
}

function sortByProminence(images: GalleryManifestItem[]) {
  return [...images].sort((leftImage, rightImage) => {
    const leftLandscapeBonus = leftImage.orientation === "landscape" ? 1 : 0;
    const rightLandscapeBonus = rightImage.orientation === "landscape" ? 1 : 0;

    if (leftLandscapeBonus !== rightLandscapeBonus) {
      return rightLandscapeBonus - leftLandscapeBonus;
    }

    return rightImage.width * rightImage.height - leftImage.width * leftImage.height;
  });
}

function selectShowcaseImages(images: GalleryManifestItem[]) {
  const sortedImages = sortByProminence(images);
  const featuredImages = sortedImages.slice(0, Math.min(3, sortedImages.length));

  return featuredImages.map((image, index) => ({
    src: image.src,
    alt: `Fotografija smestaja ${index + 1}`,
    title: showcaseCopy[index]?.title ?? "Fotografija smestaja",
    text:
      showcaseCopy[index]?.text ??
      "Fotografija iz objekta za prikaz soba, ambijenta i uslova boravka."
  }));
}

function createGalleryImages(images: GalleryManifestItem[]) {
  return images.map((image, index) => ({
    image: image.src,
    title: `Fotografija smestaja ${index + 1}`,
    description: `Originalna fotografija iz objekta (${image.sourceName}).`
  }));
}

export async function getLandingGallery(): Promise<LandingGallery> {
  const manifestImages = await readClientGalleryManifest();

  if (manifestImages.length === 0) {
    return {
      detailImage: "/images/legacy/jagdschloessl-1.jpg",
      locationImage: "/images/legacy/jagdschloessl-5.jpg",
      showcaseImages: [
        {
          src: "/images/2.PNG",
          alt: "Svetla i uredna soba sa velikim krevetom",
          title: "Uredne i svetle sobe",
          text: "Prostor za miran odmor posle posla, puta ili duzeg boravka u Minhenu."
        },
        {
          src: "/images/3.PNG",
          alt: "Detalj enterijera sa krevetom i TV-om",
          title: "Prijatan enterijer",
          text: "Funkcionalan raspored i sve sto je gostima potrebno za svakodnevni boravak."
        },
        {
          src: "/images/4.PNG",
          alt: "Soba sa vise kreveta i prirodnim svetlom",
          title: "Opcije za vise gostiju",
          text: "Sobe prilagodjene pojedincima, parovima, radnicima i manjim grupama."
        }
      ],
      galleryImages: legacyGallery
    };
  }

  const showcaseImages = selectShowcaseImages(manifestImages);
  const galleryImages = createGalleryImages(manifestImages);
  const primaryImage =
    showcaseImages[0]?.src ?? galleryImages[0]?.image ?? "/images/legacy/jagdschloessl-1.jpg";
  const secondaryImage = showcaseImages[1]?.src ?? galleryImages[1]?.image ?? primaryImage;

  return {
    detailImage: primaryImage,
    locationImage: secondaryImage,
    showcaseImages,
    galleryImages
  };
}
