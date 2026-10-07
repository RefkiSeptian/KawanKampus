# Homepage image assets

The six transparent student images embedded in the supplied preview_kawankampus.html were adapted using the built-in image_gen tool (no CLI/API fallback). These are illustrative compositions, not identified students or program participants.

Final project assets are saved in C:\UI\Project\KawanKampus\public\images\home\:

- hero.webp (1000 × 1000)
- organisasi.webp (800 × 600)
- lomba.webp (800 × 600)
- beasiswa.webp (800 × 600)
- internasional.webp (800 × 600)
- karier.webp (800 × 600)

Each received one independent edit call. Transparent alpha was preserved; WebP encoding/downscaling was used only for delivery optimization. Original outputs remain in the Codex generated_images directory.

## Final prompt set

The following exact template was used separately with asset names hero, organisasi, lomba, beasiswa, internasional, and karier:

Use case: precise-object-edit. Asset type: Kawan Kampus Indonesian student website {asset name} cutout. Input image is the EDIT TARGET, not a style suggestion. Preserve exactly its students, faces, poses, hijab, books, laptop, props, composition, framing, photorealistic style, and soft studio lighting. Only recolor the electric royal-blue furniture/platforms to Musi Navy #16202E (retain realistic highlights), and royal-blue shirts/jackets/backpacks to deep Navy #16202E or muted Slate #5A6675. Recolor yellow paper, notebooks, lamp, and small accents to Sunrise Gold #F7BB17 or Amber #F3A52D. Keep skin, hair, jeans, neutral Linen #FAF8F4 clothing, silver laptop, and globe natural. No text or logos. Maintain the entire original scene uncropped, clear edges, transparent background with real alpha. Do not add a background, gradient, shadow rectangle, people, or new objects. Return a polished high-resolution single image, same composition and aspect ratio as the input.
