webpackHotUpdate("static/development/pages/funds/details.js",{

/***/ "./pages/funds/details.js":
/*!********************************!*\
  !*** ./pages/funds/details.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/layout */ "./components/layout.js");
/* harmony import */ var _ethereum_fund__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../ethereum/fund */ "./ethereum/fund.js");
/* harmony import */ var _ethereum_bidding__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../ethereum/bidding */ "./ethereum/bidding.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _ethereum_web3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../ethereum/web3 */ "./ethereum/web3.js");
/* harmony import */ var _components_modalForms_addChildManager__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/modalForms/addChildManager */ "./components/modalForms/addChildManager.js");
/* harmony import */ var _components_modalForms_injectToken__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components/modalForms/injectToken */ "./components/modalForms/injectToken.js");
/* harmony import */ var _components_modalForms_withdrawTokens__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/modalForms/withdrawTokens */ "./components/modalForms/withdrawTokens.js");
/* harmony import */ var _components_modals_potentialChildManagerList__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../components/modals/potentialChildManagerList */ "./components/modals/potentialChildManagerList.js");
/* harmony import */ var _components_modals_floatTenderModal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../components/modals/floatTenderModal */ "./components/modals/floatTenderModal.js");
/* harmony import */ var _components_modals_finalizeTenderModal__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../components/modals/finalizeTenderModal */ "./components/modals/finalizeTenderModal.js");
/* harmony import */ var _components_modalForms_addTrustedCompanyToTenderModalForm__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../components/modalForms/addTrustedCompanyToTenderModalForm */ "./components/modalForms/addTrustedCompanyToTenderModalForm.js");
/* harmony import */ var _components_modalForms_biddingModalForm__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../components/modalForms/biddingModalForm */ "./components/modalForms/biddingModalForm.js");
/* harmony import */ var _components_modals_allotedCompanyModal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../components/modals/allotedCompanyModal */ "./components/modals/allotedCompanyModal.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _ethereum_token__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../ethereum/token */ "./ethereum/token.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! bcryptjs */ "./node_modules/bcryptjs/dist/bcrypt.js");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _components_chatApp__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../components/chatApp */ "./components/chatApp.js");









var __jsx = react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement;
// Shows users detail about particular Fund
// Here we will have Campaign's address from the URL.





















var FundDetails =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(FundDetails, _Component);

  function FundDetails() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, FundDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(FundDetails)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "state", {
      visible: false,
      loggedIn: false,
      loading: false,
      passEntered: '',
      address: '',
      isChannelCreated: _this.props.isChannelCreated,
      errorMessage: ''
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "channelCreationSubmit", function _callee(event) {
      var salt, hash, response;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();

              _this.setState({
                loading: true
              });

              salt = bcryptjs__WEBPACK_IMPORTED_MODULE_27___default.a.genSaltSync(10);
              hash = bcryptjs__WEBPACK_IMPORTED_MODULE_27___default.a.hashSync(_this.state.passEntered, salt);
              _context.next = 6;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_26___default.a.post('http://54.191.195.43:9999/channel/create', {
                name: _this.props.address,
                hash: hash
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }));

            case 6:
              response = _context.sent;
              console.log(response.data);

              _this.setState({
                loading: false,
                visible: false,
                isChannelCreated: true
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_8__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this), "loginSubmit", function (event) {
      event.preventDefault();

      _this.setState({
        errorMessage: ''
      });

      if (bcryptjs__WEBPACK_IMPORTED_MODULE_27___default.a.compareSync(_this.state.passEntered, _this.props.hash)) {
        _this.setState({
          loggedIn: true
        });
      } else _this.setState({
        errorMessage: "Invalid password!"
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(FundDetails, [{
    key: "renderCards",
    // Helper method to render cards
    value: function renderCards() {
      // Destrcuturing from this.props
      var _this$props = this.props,
          description = _this$props.description,
          manager = _this$props.manager,
          parentManager = _this$props.parentManager,
          parent = _this$props.parent,
          childFunds = _this$props.childFunds,
          potentialChildManagers = _this$props.potentialChildManagers,
          isLastLevel = _this$props.isLastLevel,
          currentBalance = _this$props.currentBalance;
      var items = [{
        header: manager,
        meta: 'Address of manager',
        description: 'The manager manages Funds in this Campaign',
        style: {
          overflowWrap: 'break-word'
        } // Style to limit overflow of address which is very long.

      }, {
        header: description,
        meta: 'Description of Contract',
        description: 'Description tells about purpose of this Contract'
      }, {
        header: parentManager,
        meta: 'Address of Parent Manager',
        description: 'Parent manager is manager of Parent of this Contract',
        style: {
          overflowWrap: 'break-word'
        } // Style to limit overflow of address which is very long.

      }, {
        header: parent,
        meta: 'Address of Parent Contract',
        description: 'Parent contract approved funds for this contract.',
        style: {
          overflowWrap: 'break-word'
        }
      }, {
        header: childFunds.length.toString(),
        meta: 'Number of Child Contracts',
        description: "Number of Contracts to which this Contract has alloted funds."
      }, {
        header: potentialChildManagers.length.toString(),
        meta: 'Number of Deputy Child Managers',
        description: "Number of persons who can become manager of child contract."
      }, {
        header: currentBalance,
        meta: 'Fund Balance (GovEth)',
        description: 'The balance is how much money Contract has right now'
      }, {
        header: isLastLevel.toString(),
        meta: 'Is this Last Level Contract?',
        description: "A Last Level Contract transfers funds directly to person's address after completion of some milestone."
      }];
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Card"].Group, {
        items: items
      });
    }
  }, {
    key: "showCreationForm",
    value: function showCreationForm() {
      var _this2 = this;

      console.log(this.props.thisAcc, this.props.manager);
      if (this.props.thisAcc !== this.props.manager) return __jsx("div", null, __jsx("h4", null, "Channel not created and only manager can create channel"));else return __jsx("div", null, __jsx("h3", null, "Create Channel"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Form"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Form"].Field, null, __jsx("label", null, "Password"), __jsx("input", {
        type: "password",
        placeholder: "Set password",
        onChange: function onChange(event) {
          return _this2.setState({
            passEntered: event.target.value
          });
        }
      })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        type: "submit",
        onClick: this.channelCreationSubmit,
        loading: this.state.loading
      }, "Submit")));
    }
  }, {
    key: "showLoginForm",
    value: function showLoginForm() {
      var _this3 = this;

      return __jsx("div", null, __jsx("h3", null, "Login to channel"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Form"], {
        error: !!this.state.errorMessage
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Form"].Field, null, __jsx("label", null, "Password"), __jsx("input", {
        type: "password",
        placeholder: "Enter password",
        onChange: function onChange(event) {
          return _this3.setState({
            passEntered: event.target.value
          });
        }
      })), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Message"], {
        error: true,
        header: "Oops!",
        content: this.state.errorMessage
      }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        type: "submit",
        onClick: this.loginSubmit,
        loading: this.state.loading
      }, "Submit")));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      console.log(this.props.pcmNames);
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Sidebar"].Pushable, {
        as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"]
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Sidebar"], {
        as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Menu"],
        animation: "overlay",
        icon: "labeled",
        onHide: function onHide() {
          return _this4.setState({
            visible: false
          });
        },
        vertical: true,
        visible: this.state.visible,
        width: "very wide"
      }, !this.state.isChannelCreated ? this.showCreationForm() : this.state.loggedIn ? __jsx(_components_chatApp__WEBPACK_IMPORTED_MODULE_28__["default"], {
        address: this.props.dbaddress,
        pass: this.state.passEntered,
        id: this.props.thisAcc
      }) : this.showLoginForm()), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Sidebar"].Pusher, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"], {
        basic: true
      }, __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_10__["default"], {
        render: function render(_ref) {
          var setLoading = _ref.setLoading,
              setNotLoading = _ref.setNotLoading;
          return __jsx("div", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Row, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Column, {
            width: 10
          }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"], {
            textAlign: "center",
            inverted: true,
            color: "grey"
          }, __jsx("h3", null, "Fund Details"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Column, {
            width: 6
          }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"], {
            textAlign: "center",
            inverted: true,
            color: "grey"
          }, __jsx("h3", null, "Actions"))))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Row, null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Column, {
            width: 10
          }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"], {
            textAlign: "center"
          }, _this4.renderCards())), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Grid"].Column, {
            width: 6
          }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Segment"], {
            textAlign: "center"
          }, __jsx(_components_modalForms_addChildManager__WEBPACK_IMPORTED_MODULE_15__["default"], {
            address: _this4.props.address
          }), __jsx(_components_modals_potentialChildManagerList__WEBPACK_IMPORTED_MODULE_18__["default"], {
            address: _this4.props.address,
            potentialChildManagers: _this4.props.potentialChildManagers,
            names: _this4.props.pcmNames
          }), _this4.props.isTenderFinalized ? __jsx(_components_modals_allotedCompanyModal__WEBPACK_IMPORTED_MODULE_23__["default"], {
            address: _this4.props.address,
            lowestBid: _this4.props.lowestBid,
            companyAlloted: _this4.props.companyAlloted
          }) : null, _this4.props.manager === _this4.props.parentManager ? __jsx(_components_modalForms_injectToken__WEBPACK_IMPORTED_MODULE_16__["default"], {
            address: _this4.props.address
          }) : null, __jsx(_routes__WEBPACK_IMPORTED_MODULE_24__["Link"], {
            route: "getFundRequestsByChild",
            params: {
              contractAddress: _this4.props.address
            }
          }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
            primary: true,
            icon: "eye",
            style: {
              marginTop: 10
            },
            content: !_this4.props.isLastLevel ? 'View Child Requests' : 'Milestone Completion Requests By Company',
            onClick: setLoading
          }))), __jsx(_routes__WEBPACK_IMPORTED_MODULE_24__["Link"], {
            route: "getFundRequestsByManager",
            params: {
              contractAddress: _this4.props.address
            }
          }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
            primary: true,
            icon: "eye",
            style: {
              marginTop: 10
            },
            content: !_this4.props.isLastLevel ? 'View Manager Requests' : 'Milestone Assignment by Manager',
            onClick: setLoading
          }))), !_this4.props.isLastLevel ? __jsx(_routes__WEBPACK_IMPORTED_MODULE_24__["Link"], {
            route: "getChildFunds",
            params: {
              contractAddress: _this4.props.address
            }
          }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
            primary: true,
            icon: "eye",
            style: {
              marginTop: 10
            },
            content: "View Child Funds",
            onClick: setLoading
          }))) : null, _this4.props.canFloatTender ? __jsx(_components_modals_floatTenderModal__WEBPACK_IMPORTED_MODULE_19__["default"], {
            address: _this4.props.address
          }) : null, _this4.props.canFinalizeTender ? __jsx(_components_modals_finalizeTenderModal__WEBPACK_IMPORTED_MODULE_20__["default"], {
            address: _this4.props.address,
            companyAlloted: _this4.props.companyAlloted
          }) : null, _this4.props.canAddCompanies ? __jsx(_components_modalForms_addTrustedCompanyToTenderModalForm__WEBPACK_IMPORTED_MODULE_21__["default"], {
            address: _this4.props.address
          }) : null, _this4.props.canBid ? __jsx(_components_modalForms_biddingModalForm__WEBPACK_IMPORTED_MODULE_22__["default"], {
            address: _this4.props.address
          }) : null, __jsx(_components_modalForms_withdrawTokens__WEBPACK_IMPORTED_MODULE_17__["default"], {
            address: _this4.props.address,
            balance: _this4.props.currentBalance
          }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_13__["Button"], {
            primary: true,
            icon: "eye",
            style: {
              marginTop: 10
            },
            content: "View chats",
            onClick: function onClick() {
              _this4.setState({
                visible: !_this4.state.visible
              });
            }
          }))))));
        }
      }))));
    }
  }], [{
    key: "getInitialProps",
    value: function getInitialProps(props) {
      var thisAcc, fund, summary, balance, tenderAddress, companyAlloted, isTenderFinalized, canFloatTender, canFinalizeTender, canBid, canAddCompanies, lowestBid, dbaddress, hash, isChannelCreated, data, nameProps;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.async(function getInitialProps$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(_ethereum_web3__WEBPACK_IMPORTED_MODULE_14__["default"].eth.getAccounts());

            case 2:
              thisAcc = _context3.sent;
              fund = Object(_ethereum_fund__WEBPACK_IMPORTED_MODULE_11__["default"])(props.query.contractAddress);
              _context3.next = 6;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(fund.methods.getSummary().call());

            case 6:
              summary = _context3.sent;
              _context3.next = 9;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(_ethereum_token__WEBPACK_IMPORTED_MODULE_25__["default"].methods.balanceOf(props.query.contractAddress).call());

            case 9:
              balance = _context3.sent;
              _context3.next = 12;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(fund.methods.tenderAddress().call());

            case 12:
              tenderAddress = _context3.sent;
              _context3.next = 15;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(fund.methods.CompanyAlloted().call());

            case 15:
              companyAlloted = _context3.sent;
              _context3.next = 18;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(fund.methods.isTenderFinalized().call());

            case 18:
              isTenderFinalized = _context3.sent;
              canFloatTender = true;
              canFinalizeTender = false;
              canBid = false;
              canAddCompanies = false;

              if (tenderAddress.toString() === '0x0000000000000000000000000000000000000000') {} else {
                // Tender has already been floated for this instance of Fund.
                if (companyAlloted === '0x0000000000000000000000000000000000000000') {
                  // If no company has been finalized yet.
                  canFinalizeTender = true;
                  canAddCompanies = true;
                  canBid = true;
                } else {
                  // Company has been alloted
                  canAddCompanies = false;
                  canFinalizeTender = false;
                  canBid = false;
                }

                canFloatTender = false;
              }

              if (!summary[6]) {
                // summary[6] is IsLastLevel
                canFloatTender = false;
                canFinalizeTender = false;
                canBid = false;
              }

              lowestBid = null;

              if (!isTenderFinalized) {
                _context3.next = 31;
                break;
              }

              bidding = Object(_ethereum_bidding__WEBPACK_IMPORTED_MODULE_12__["default"])(tenderAddress);
              _context3.next = 30;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(bidding.methods.lowestBid().call());

            case 30:
              lowestBid = _context3.sent;

            case 31:
              _context3.prev = 31;
              _context3.next = 34;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_26___default.a.get('http://54.191.195.43:9999/channel/' + props.query.contractAddress));

            case 34:
              data = _context3.sent;
              dbaddress = data.data.address;
              hash = data.data.hash;
              isChannelCreated = true;
              _context3.next = 43;
              break;

            case 40:
              _context3.prev = 40;
              _context3.t0 = _context3["catch"](31);
              isChannelCreated = false;

            case 43:
              _context3.next = 45;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.all(summary[5].map(function _callee2(pcm, idx) {
                var _data;

                return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.awrap(axios__WEBPACK_IMPORTED_MODULE_26___default.a.get('http://54.191.195.43:9999/users/' + pcm));

                      case 3:
                        _data = _context2.sent;
                        return _context2.abrupt("return", _data.data.name);

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        return _context2.abrupt("return", 'Anonymous');

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, null, [[0, 7]]);
              })));

            case 45:
              nameProps = _context3.sent;
              return _context3.abrupt("return", {
                address: props.query.contractAddress,
                // To pass address coming from URL to contributeForm Component.
                description: summary[0],
                manager: summary[1],
                parentManager: summary[2],
                parent: summary[3],
                childFunds: summary[4],
                potentialChildManagers: summary[5],
                pcmNames: nameProps,
                isLastLevel: summary[6],
                currentBalance: balance,
                tenderAddress: tenderAddress,
                companyAlloted: companyAlloted,
                canFloatTender: canFloatTender,
                canFinalizeTender: canFinalizeTender,
                canBid: canBid,
                canAddCompanies: canAddCompanies,
                isTenderFinalized: isTenderFinalized,
                lowestBid: lowestBid,
                dbaddress: dbaddress,
                hash: hash,
                isChannelCreated: isChannelCreated,
                thisAcc: thisAcc[0]
              });

            case 47:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[31, 40]]);
    }
  }]);

  return FundDetails;
}(react__WEBPACK_IMPORTED_MODULE_9__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FundDetails); // (
// 									{!this.props.bidInstance.toString() ?
// 									(
// 										{!this.props.companyAlloted ? 
// 											(
// 											) : null
// 										}
// 									)
// 									: null }
// 								)
// {this.props.isLastLevel ? (
// 									{!!this.props.bidInstance.toString() ? (
// 										(<Button 
// 											primary
// 											icon='eye'
// 											style={{ marginTop: 10 }}
// 											content='Finalize Bid'
// 										/>)
// 									) : }
// 								) : null}
// 								{this.props.isLastLevel ? (
// 									(
// 										{!!this.props.bidInstance.toString() ?
// 									(<Button 
// 										primary
// 										icon='eye'
// 										style={{ marginTop: 10 }}
// 										content='Bid Here'
// 									/>) : null }
// 								)
// 								) : null}

/***/ })

})
//# sourceMappingURL=details.js.4877fc27a79681e8a8da.hot-update.js.map