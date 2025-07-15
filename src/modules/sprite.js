/*
 * import { sprite } from '@/modules/sprite.js';
 * const icon = sprite.svg('category', 'name', 28, 28);
 */
export const sprite = {
  /**
   * Generates SVG markup string for an icon from a sprite.
   * @param {string} spriteName - Name of the sprite (folder)
   * @param {string} iconId - Icon identifier (filename without extension)
   * @param {number} width - Icon width (default 24)
   * @param {number} height - Icon height (default 24)
   * @param {string} className - CSS class for the <svg> element (optional)
   * @returns {string} SVG markup string
   */
  svg(spriteName, iconId, width = 24, height = 24, className = '') {
    const href = `./sprites/${spriteName}.svg#icon-${iconId}`;
    const clsAttr = className
      ? ` class="sprite-icon ${className}"`
      : ` class="sprite-icon"`;
    return `
      <svg width="${width}" height="${height}" aria-hidden="true" focusable="false"${clsAttr}>
        <use xlink:href="${href}" href="${href}"></use>
      </svg>
    `;
  },
};
