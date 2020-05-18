<template>
	<div>
		<Hero :title="hero.title"
			  :description="hero.desc" />

		<div class="box box--fixed-width is-relative">
			<b-loading :is-full-page="false"
					   :active.sync="exchangeRates.isLoading" />

			<b-field horizontal=""
					 message="Telefonun fiyatını bilmiyorsanız veri tabanında arayabilirsiniz."
					 label="Telefon">
				<b-autocomplete
						:data="phoneSearch.phoneList"
						:loading="phoneSearch.isLoading"
						:custom-formatter="phoneSearch_customFormatter"
						@typing="phoneSearch_search"
						@select="phoneSearch_phoneSelected"
						clearable=""
						class="autocomplete--algolia"
						expanded=""
						data-cy="form.phoneSearch"
						v-model="form.phoneSearch"
						field="title storage"
						placeholder="En az 3 karakter girerek arayın">

					<template slot-scope="props">
						<div :data-price="props.option.prices[form.currency]"
							 data-cy="form.phoneSearch.props"
							 class="media is-vcentered">
							<div class="media-left">
								<img :alt="props.option.title"
									 v-lazy="props.option.imageUrl"
									 draggable="false"
									 width=""
									 height="" />
							</div>

							<div class="media-content">
								<b>{{ phoneSearch_customFormatter(props.option) }}</b>
								<br />
								<small>
									Fiyat:
									<template v-for="(price, currency, index) in props.option.prices">
										<span :key="index">
											{{ currencyFormat(price, currency) }}
											<span v-if="index !== Object.keys(props.option.prices).length - 1">&nbsp;/&nbsp;</span>
										</span>
									</template>
								</small>
							</div>
						</div>
					</template>

					<template slot="empty">
						Telefon bulunamadı
					</template>
				</b-autocomplete>
			</b-field>


			<b-field :message="exchangeRates.rateInfo"
					 horizontal=""
					 expanded=""
					 label="Telefon fiyatı">
				<b-field>
					<b-input min="1"
							 expanded=""
							 placeholder="Telefon fiyatı"
							 step="any"
							 maxlength="30"
							 data-cy="form.phonePrice"
							 v-model="form.phonePrice"
							 type="number" />
					<div class="control">
						<b-select data-cy="form.currency"
								  v-model="form.currency">
							<option v-for="(currencyName, currencyKey) in Constants.Currencies"
									:key="currencyKey">
								{{currencyName}}
							</option>
						</b-select>
					</div>
				</b-field>
			</b-field>


			<b-field horizontal=""
					 label="Kayıt yolu">
				<b-select data-cy="form.registration"
						  v-model="form.registration"
						  expanded="">
					<option :value="Constants.Enums.REGISTRATION_IMPORT">İthalat yoluyla kayıtlı</option>
					<option :value="Constants.Enums.REGISTRATION_PASSPORT">Pasaport yoluyla kayıtlı</option>
				</b-select>
			</b-field>


			<template v-if="results.meta.showResults">
				<div id="results">
					<hr />

					<b-field horizontal=""
							 expanded=""
							 label="Vergisiz fiyat">
						<b-input :value="currencyFormat(results.taxFreePrice, 'TRY')"
								 expanded=""
								 readonly=""
								 data-cy="results.taxFreePrice"
								 custom-class="is-static" />
					</b-field>

					<template v-if="form.registration === Constants.Enums.REGISTRATION_IMPORT">
						<b-field :label="`Kültür Bakanlığı (%${Constants.TaxRates.ministryOfCulture})`"
								 horizontal=""
								 expanded="">
							<b-input :value="currencyFormat(results.ministryOfCultureFee, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.ministryOfCultureFee"
									 custom-class="is-static" />
						</b-field>

						<b-field :label="`TRT Bandrolü (%${Constants.TaxRates.trt})`"
								 horizontal=""
								 expanded="">
							<b-input :value="currencyFormat(results.trtFee, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.trtFee"
									 custom-class="is-static" />
						</b-field>

						<b-field :label="`ÖTV (%${Constants.TaxRates.sct})`"
								 horizontal=""
								 expanded="">
							<b-input :value="currencyFormat(results.sctFree, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.sctFree"
									 custom-class="is-static" />
						</b-field>

						<b-field :label="`KDV (%${Constants.TaxRates.vat})`"
								 horizontal=""
								 expanded="">
							<b-input :value="currencyFormat(results.vatFee, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.vatFee"
									 custom-class="is-static" />
						</b-field>
					</template>

					<template v-else-if="form.registration === Constants.Enums.REGISTRATION_PASSPORT">
						<b-field :message="exchangeRates.trtFeeInRegistrationByPassportInfo"
								 :label="`TRT Bandrolü (${currencyFormat(20, 'EUR')})`"
								 horizontal=""
								 expanded="">
							<b-input :value="currencyFormat(results.trtFee, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.trtFee"
									 custom-class="is-static" />
						</b-field>

						<b-field horizontal=""
								 expanded=""
								 label="Kayıt ücreti">
							<b-input :value="currencyFormat(results.registrationFee, 'TRY')"
									 expanded=""
									 readonly=""
									 data-cy="results.registrationFee"
									 custom-class="is-static" />
						</b-field>
					</template>

					<b-field :label="`Toplam vergi (%${results.totalTaxRate})`"
							 horizontal=""
							 expanded="">
						<b-input :value="currencyFormat(results.totalTaxFee, 'TRY')"
								 expanded=""
								 readonly=""
								 data-cy="results.totalTaxFee"
								 custom-class="is-static" />
					</b-field>

					<b-field horizontal=""
							 expanded=""
							 label="Satış fiyatı">
						<b-input :value="currencyFormat(results.salePrice, 'TRY')"
								 expanded=""
								 readonly=""
								 data-cy="results.salePrice"
								 custom-class="is-static" />
					</b-field>
				</div>

				<b-field horizontal>
					<div class="control">
						<b-message size="is-small" type="is-info">
							Türkiye'de asgari ücretle çalışan birisi yemeden içmeden bu telefonu yaklaşık {{results.meta.minWageMonthCount}} ayda satın alabilir.
						</b-message>

						<Share :data="results.meta.shareData" />
					</div>
				</b-field>
			</template>
		</div>
	</div>
</template>

<script>
import algolia from "../../../api/api.algolia";
import Hero from "../../Common/components/Hero";
import Share from "../../Common/components/Share";
import debounce from "debounce";
import axios from "axios";
import {Base64} from "js-base64";
import {currencyFormat} from "../../Common/utils/_index";
import Vue from "vue";


export default {
	name: "TelefonVergisiHesaplayici",
	components: {
		Hero,
		Share
	},
	data() {
		const Constants = {
			Enums: {
				REGISTRATION_IMPORT: 1, // İthalat yoluyla kayıtlı
				REGISTRATION_PASSPORT: 2, // Pasaport yoluyla kayıtlı
				REGISTRATION_FEE: 1838, // Pasaport kayıt ücreti
				MINIMUN_WAGE: 2324.70 // Asgari ücret
			},
			Currencies: ["USD", "EUR"],
			DefaultCurrency: "USD",
			TaxRates: {
				ministryOfCulture: 1,
				trt: 10,
				sct: 0,
				vat: 18
			}
		};

		return {
			Constants,
			exchangeRates: {
				rateInfo: "",
				trtFeeInRegistrationByPassportInfo: "",
				isLoading: false,
				rates: {}
			},
			phoneSearch: {
				phoneList: [],
				phonePrices: {},
				isLoading: false
			},
			form: {
				phoneSearch: "",
				currency: Constants.DefaultCurrency,
				registration: Constants.Enums.REGISTRATION_IMPORT,
				phonePrice: ""
			},
			results: {
				meta: {
					showResults: false,
					shareData: "",
					minWageMonthCount: 0
				},
				taxFreePrice: 0,
				ministryOfCultureFee: 0,
				trtFee: 0,
				sctFree: 0,
				vatFee: 0,
				registrationFee: 0,
				totalTaxFee: 0,
				totalTaxRate: 0,
				salePrice: 0
			},
			hero: {
				title: "",
				desc: ""
			}
		};
	},
	created: async function() {
		const vm = this;

		// Create exchange rates with each currency. This prevents 2 changes to the code when adding or removing a currency
		vm.Constants.Currencies.forEach(key => vm.exchangeRates.rates[key] = 0);

		// Load from data from query
		const formFromQuery = vm.$route.query.data;
		if (formFromQuery) {
			vm.form = JSON.parse(Base64.decode(formFromQuery));
		}

		vm.hero.title = vm.$route.meta.title;
		vm.hero.desc = vm.$route.meta.desc;
	},
	methods: {
		updateExchangeRate: async function(targetCurrency) {
			const vm = this;

			// Update the exchange rate of the target currency from the API to the latest, if is not updated previously
			if (vm.exchangeRates.rates[targetCurrency] === 0) {
				vm.exchangeRates.isLoading = true;

				await axios.get(`https://api.exchangeratesapi.io/latest?base=${targetCurrency}&symbols=TRY`)
					.then(response => response.data)
					.then(latestCurrency => {
						vm.exchangeRates.rates[targetCurrency] = latestCurrency["rates"]["TRY"];
					})
					.catch(error => {
						vm.$buefy.notification.open({
							message: error.message,
							position: "is-bottom-right",
							type: "is-danger",
							indefinite: true
						});
					})
					.finally(() => {
						vm.exchangeRates.isLoading = false;
					});
			}
		},
		taxCalculator() { // TODO: This feature will be moved to its own file to use for E2E testing too.
			const vm = this;

			const taxFreePrice = parseFloat(vm.form.phonePrice) * vm.exchangeRates.rates[vm.form.currency];
			let salePrice = taxFreePrice;
			let totalTaxFee = 0;

			vm.results.taxFreePrice = taxFreePrice;
			return {
				// Ministry of Culture fee
				addMinistryOfCultureFee() {
					vm.results.ministryOfCultureFee = (salePrice / 100);

					salePrice += vm.results.ministryOfCultureFee;
					totalTaxFee += vm.results.ministryOfCultureFee;
					return this;
				},
				// TRT fee
				addTrtFee() {
					if (vm.form.registration === vm.Constants.Enums.REGISTRATION_IMPORT) {
						vm.results.trtFee = (salePrice / 100) * vm.Constants.TaxRates.trt;
					} else if (vm.form.registration === vm.Constants.Enums.REGISTRATION_PASSPORT) {
						vm.results.trtFee = 20 * vm.exchangeRates.rates["EUR"];
					}

					salePrice += vm.results.trtFee;
					totalTaxFee += vm.results.trtFee;
					return this;
				},
				// Registration fee
				addRegistrationFee() {
					vm.results.registrationFee = vm.Constants.Enums.REGISTRATION_FEE;

					salePrice += vm.results.registrationFee;
					totalTaxFee += vm.results.registrationFee;
					return this;
				},
				// SCT fee (The rate varies by price)
				addSctFree() {
					if (salePrice <= 640) {
						vm.Constants.TaxRates.sct = 25;
					} else if (salePrice >= 640 && salePrice <= 1500) {
						vm.Constants.TaxRates.sct = 40;
					} else if (salePrice > 1500) {
						vm.Constants.TaxRates.sct = 50;
					}

					vm.results.sctFree = (salePrice / 100) * vm.Constants.TaxRates.sct;

					salePrice += vm.results.sctFree;
					totalTaxFee += vm.results.sctFree;
					return this;
				},
				// VAT fee
				addVatFee() {
					vm.results.vatFee = (salePrice / 100) * vm.Constants.TaxRates.vat;

					salePrice += vm.results.vatFee;
					totalTaxFee += vm.results.vatFee;
					return this;
				},
				getSalePrice() {
					return salePrice;
				},
				getTotalTaxFee() {
					return totalTaxFee;
				},
				getTotalTaxRate() {
					return ((totalTaxFee / taxFreePrice) * 100).toFixed(2);
				}
			};
		},
		calculate: async function() {
			const vm = this;

			// Calculate and show results, only if possible
			vm.results.meta.showResults = vm.form.phonePrice > 0 && vm.form.currency && vm.form.registration;
			if (!vm.results.meta.showResults) {
				return;
			}

			// Update the exchange rate of the chosen currency
			await vm.updateExchangeRate(vm.form.currency);

			// Create rate information label
			vm.exchangeRates.rateInfo = vm.rateInfoLabel(vm.form.currency);

			const taxCalculator = vm.taxCalculator();
			switch (vm.form.registration) {
				case vm.Constants.Enums.REGISTRATION_IMPORT:
					taxCalculator.addMinistryOfCultureFee().addTrtFee().addSctFree().addVatFee();
					break;

				case vm.Constants.Enums.REGISTRATION_PASSPORT:
					// Load EUR exchange rate to calculate TRT fee in registration by passport
					await vm.updateExchangeRate("EUR");

					// Create rate information label
					vm.exchangeRates.trtFeeInRegistrationByPassportInfo = vm.rateInfoLabel("EUR");

					taxCalculator.addMinistryOfCultureFee().addTrtFee().addRegistrationFee();
					break;
			}

			vm.results.salePrice = taxCalculator.getSalePrice();
			vm.results.totalTaxFee = taxCalculator.getTotalTaxFee();
			vm.results.totalTaxRate = taxCalculator.getTotalTaxRate();

			vm.results.meta.shareData = Base64.encode(JSON.stringify(vm.form));

			vm.results.meta.minWageMonthCount = (vm.results.salePrice / vm.Constants.Enums.MINIMUN_WAGE).toFixed(2);
		},
		phoneSearch_customFormatter(phone) {
			return `${phone.title} / ${phone.storage} GB`;
		},
		phoneSearch_phoneSelected(phone) {
			const vm = this;

			if (phone) {
				if (!Object.keys(phone.prices).includes(vm.form.currency)) {
					vm.form.currency = vm.Constants.DefaultCurrency;
				}

				vm.phoneSearch.phonePrices = phone.prices;
				vm.form.phonePrice = phone.prices[vm.form.currency];
			} else {
				vm.phoneSearch.phonePrices = {};
				vm.form.phonePrice = "";
			}

			vm.form.phoneSearch = "asa";
		},
		phoneSearch_search: debounce(function(name) {
			const vm = this;

			// Requires 3 length long name to search (To reduce Algolia community limit a little)
			if (name.length < 3) {
				return;
			}

			vm.phoneSearch.isLoading = true;

			algolia.search(name)
				.then(({hits}) => {
					hits.forEach(hit => {
						Object.keys(hit["prices"]).forEach(storage => {
							vm.phoneSearch.phoneList.push({
								title: hit["title"],
								imageUrl: hit["imageUrl"],
								storage: storage,
								prices: hit["prices"][storage]
							});
						});
					});
				})
				.catch(error => {
					vm.$buefy.notification.open({
						message: error.message,
						position: "is-bottom-right",
						type: "is-danger",
						indefinite: true
					});
				})
				.finally(() => {
					vm.phoneSearch.isLoading = false;
				});
		}, 500),
		rateInfoLabel(currency) {
			return `1 ${currency} = ${this.currencyFormat(this.exchangeRates.rates[currency], "TRY", 4)}`;
		}
	},
	computed: {
		currencyFormat() {
			return function(price, currency = null, minimumFractionDigits = 2) {
				if (currency === null) {
					currency = this.form.currency;
				}

				return currencyFormat(price, currency, minimumFractionDigits);
			};
		}
	},
	watch: {
		"form.currency"() {
			this.calculate();
		},
		"form.registration"() {
			this.calculate();
		},
		"form.phonePrice"() {
			this.calculate();
		}
	},
	metaInfo() {
		const vm = this;

		return {
			title: vm.$route.meta.title,
			description: vm.$route.meta.desc,
			titleTemplate: Vue.prototype.VueMetaTemplate
		};
	}
};
</script>

<style lang="scss" scoped="">
	.autocomplete .dropdown-item .media .media-left img {
		height: 42px;
		width: 42px;
		vertical-align: middle;
		object-fit: contain;
		background: #fff
	}
</style>