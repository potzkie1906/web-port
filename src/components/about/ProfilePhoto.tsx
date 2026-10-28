import { site } from '../../config/site'
import { Placeholder } from '../ui/Placeholder'

/** Your photo, or a clearly marked placeholder until you add one. */
export function ProfilePhoto() {
  if (site.profileImage) {
    return (
      <figure className="profile">
        <img
          className="profile__image"
          src={site.profileImage.src}
          alt={site.profileImage.alt}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
        />
      </figure>
    )
  }

  return (
    <figure className="profile profile--placeholder">
      <div className="profile__frame" aria-hidden="true">
        <span className="profile__initials">{site.initials}</span>
      </div>
      <figcaption className="profile__caption">
        <Placeholder hint="Put your photo in public/images, then set profileImage in src/config/site.ts">
          Add your photo
        </Placeholder>
      </figcaption>
    </figure>
  )
}
