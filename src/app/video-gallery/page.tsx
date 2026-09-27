import { PageIntro } from "@/components/PageIntro";
import { VideoCard } from "@/components/VideoCard";
import { doctorVideos } from "@/data/videos";
export default function VideoGalleryPage() {
  return (
    <div>
      <PageIntro
        label="HEART HEALTH, EXPLAINED"
        title="Conversations with Dr. Sandhu."
        description="Hear directly from Dr. Sandhu about heart care and common questions."
      />
      <section className="section-padding">
        <div className="container-custom video-gallery">
          <VideoCard {...doctorVideos[0]} />
          <div>
            <h2>More from Dr. Sandhu</h2>
            <p>
              Explore more conversations and educational videos on his YouTube
              channel.
            </p>
            <a
              className="text-link"
              href="https://www.youtube.com/channel/UCTcSjzNhA-CUo45DxTVbM6Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the YouTube channel
            </a>
            <p className="field-hint">
              Featured interview published by Max Healthcare.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
