/**
 * @typedef {Page & *} KonsolVergisiHesaplayiciPresetPage
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciPresetPageDefinitionParams
 * @property {KonsolVergisiHesaplayiciPreset} preset
 * @property {KonsolVergisiHesaplayiciBrand} brand
 */

/**
 * @typedef {(params: KonsolVergisiHesaplayiciPresetPageDefinitionParams) => KonsolVergisiHesaplayiciPresetPage} KonsolVergisiHesaplayiciPresetPageDefinition
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciBrand
 * @property {number} id
 * @property {string} title
 * @property {Icon} icon
 * @property {HexColor} color
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciPreset
 * @property {number} id
 * @property {number} brandId
 * @property {string} title
 * @property {string} slug
 * @property {Date} releaseDate
 * @property {`${string}.webp`} thumbnail
 * @property {`${string}.jpg`} ogImage
 * @property {string} pageTitle
 * @property {string} pageDescription
 */
