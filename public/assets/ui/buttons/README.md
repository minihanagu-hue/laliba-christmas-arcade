# PixelButton PNG replacement

No PNG assets have been supplied. The production UI currently uses the CSS fallback in `pixel-button.css`; it does not request these missing images.

Expected filenames: `{green,red,blue,gold,cream}_{default,hover,pressed,disabled}.png` (20 images).

The HTML text, icons, native buttons/selects, labels and disabled behavior stay intact. To activate a color, provide all four images then add `pixel-png` to the corresponding `.pixel-button[data-pixel-tone="…"]` elements. CSS maps each state to the corresponding filename. Do not add this class before the files exist.

Default nine-slice contract: 48×48 RGBA PNG, 8px corner regions, transparent exterior, panel artwork in the center, no text. `border-image: … 8 fill / 8px / 0 stretch` preserves fixed-size corners while stretching only edges and center. If the supplied assets use different dimensions, adjust the slice and border widths together. PNG mode sets background transparent and removes CSS shadows to avoid double-painted panels. Verify the actual alpha channel; do not bake a checkerboard into the image.

Keep all four states the same size and slice geometry. Hover applies only on devices supporting hover; `:active` gives touch press feedback. Native `disabled` prevents operation (use it instead of setting only `aria-disabled`). Respect reduced-motion; focus uses a separate visible outline. Existing round arcade movement/action buttons keep their dedicated touch controller styling.

Standalone offline HTML uses CSS fallback. When activating PNGs, also embed the new images in the offline build so it remains self-contained.
