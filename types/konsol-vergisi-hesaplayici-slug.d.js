/**
 * @typedef {Page & { calculatorTitle: string }} KonsolVergisiHesaplayiciPresetPage
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

/**
 * @typedef {object} KonsolVergisiHesaplayiciPresetOption
 * @property {number} presetId
 * @property {string} title
 * @property {KonsolVergisiHesaplayiciPresetOptionForm} form
 * @property {KonsolVergisiHesaplayiciPresetOptionRetailPrice} [retailPrice]
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciPresetOptionForm
 * @property {number} price
 * @property {string} currency
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciPresetOptionRetailPrice
 * @property {number} value
 * @property {Date} lastUpdatedDate
 * @property {`https://${string}`} sourceUrl
 */

/**
 * @typedef {KonsolVergisiHesaplayiciPreset & KonsolVergisiHesaplayiciPresetPage} KonsolVergisiHesaplayiciPresetWithPage
 */

/**
 * @typedef {object} KonsolVergisiHesaplayiciCalculation
 * @property {KonsolVergisiHesaplayiciBrand} brand
 * @property {KonsolVergisiHesaplayiciPresetWithPage[]} presets
 */
