import Image from "next/image";
import { getRoomDisplayName } from "@/lib/rooms";
import { Room } from "@/lib/types";

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="room-card">
      <div className="room-image-wrap">
        <Image
          src={room.image}
          alt={getRoomDisplayName(room)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="room-image"
        />
        <span className={`status-pill status-${room.status}`}>{room.status}</span>
      </div>
      <div className="room-card-body">
        <div className="room-card-header">
          <div>
            <p className="eyebrow">{room.neighborhood}</p>
            <h3>{getRoomDisplayName(room)}</h3>
          </div>
          <strong>{room.pricePerNight} EUR / noc</strong>
        </div>
        <p>{room.shortDescription}</p>
        <div className="meta-row">
          <span>{room.capacity} gosta</span>
          <span>{room.beds}</span>
        </div>
        <div className="tag-row">
          {room.amenities.map((amenity) => (
            <span key={amenity}>{amenity}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
