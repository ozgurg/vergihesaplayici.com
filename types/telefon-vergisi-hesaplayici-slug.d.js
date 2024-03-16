/**
 * @typedef {Page & { calculatorTitle: string }} TelefonVergisiHesaplayiciPresetPage
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciPresetPageDefinitionParams
 * @property {TelefonVergisiHesaplayiciPreset} preset
 * @property {TelefonVergisiHesaplayiciBrand} brand
 */

/**
 * @typedef {(params: TelefonVergisiHesaplayiciPresetPageDefinitionParams) => TelefonVergisiHesaplayiciPresetPage} TelefonVergisiHesaplayiciPresetPageDefinition
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciBrand
 * @property {number} id
 * @property {string} title
 * @property {Icon} icon
 * @property {HexColor} color
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciPreset
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
 * @typedef {object} TelefonVergisiHesaplayiciPresetOption
 * @property {number} presetId
 * @property {string} title
 * @property {TelefonVergisiHesaplayiciPresetOptionForm} form
 * @property {TelefonVergisiHesaplayiciPresetOptionRetailPrice} [retailPrice]
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciPresetOptionForm
 * @property {number} price
 * @property {string} currency
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciPresetOptionRetailPrice
 * @property {number} value
 * @property {Date} lastUpdatedDate
 * @property {`https://${string}`} sourceUrl
 */

/**
 * @typedef {TelefonVergisiHesaplayiciPreset & TelefonVergisiHesaplayiciPresetPage} TelefonVergisiHesaplayiciPresetWithPage
 */

/**
 * @typedef {object} TelefonVergisiHesaplayiciCalculation
 * @property {TelefonVergisiHesaplayiciBrand} brand
 * @property {TelefonVergisiHesaplayiciPresetWithPage[]} presets
 */

