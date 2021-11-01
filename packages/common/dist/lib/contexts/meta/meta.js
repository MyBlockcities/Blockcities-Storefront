"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeta = exports.MetaProvider = void 0;
const react_1 = __importStar(require("react"));
const queryExtendedMetadata_1 = require("./queryExtendedMetadata");
const subscribeAccountsChange_1 = require("./subscribeAccountsChange");
const getEmptyMetaState_1 = require("./getEmptyMetaState");
const loadAccounts_1 = require("./loadAccounts");
const connection_1 = require("../connection");
const store_1 = require("../store");
const actions_1 = require("../../actions");
const _1 = require(".");
const __1 = require("../..");
const MetaContext = react_1.default.createContext({
    ...(0, getEmptyMetaState_1.getEmptyMetaState)(),
    isLoading: false,
    // @ts-ignore
    update: () => [actions_1.AuctionData, actions_1.BidderMetadata, actions_1.BidderPot],
});
function MetaProvider({ children = null }) {
    const connection = (0, connection_1.useConnection)();
    const { isReady, storeAddress } = (0, store_1.useStore)();
    const [state, setState] = (0, react_1.useState)((0, getEmptyMetaState_1.getEmptyMetaState)());
    const [page, setPage] = (0, react_1.useState)(0);
    const [metadataLoaded, setMetadataLoaded] = (0, react_1.useState)(false);
    const [lastLength, setLastLength] = (0, react_1.useState)(0);
    const { userAccounts } = (0, __1.useUserAccounts)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const updateMints = (0, react_1.useCallback)(async (metadataByMint) => {
        try {
            const { metadata, mintToMetadata } = await (0, queryExtendedMetadata_1.queryExtendedMetadata)(connection, metadataByMint);
            setState(current => ({
                ...current,
                metadata,
                metadataByMint: mintToMetadata,
            }));
        }
        catch (er) {
            console.error(er);
        }
    }, [setState]);
    async function pullAllMetadata() {
        if (isLoading)
            return false;
        if (!storeAddress) {
            if (isReady) {
                setIsLoading(false);
            }
            return;
        }
        else if (!state.store) {
            setIsLoading(true);
        }
        setIsLoading(true);
        const nextState = await (0, _1.pullStoreMetadata)(connection, state);
        setIsLoading(false);
        setState(nextState);
        await updateMints(nextState.metadataByMint);
        return [];
    }
    async function pullBillingPage(auctionAddress) {
        if (isLoading)
            return false;
        if (!storeAddress) {
            if (isReady) {
                setIsLoading(false);
            }
            return;
        }
        else if (!state.store) {
            setIsLoading(true);
        }
        const nextState = await (0, _1.pullAuctionSubaccounts)(connection, auctionAddress, state);
        console.log('-----> Pulling all payout tickets');
        await (0, _1.pullPayoutTickets)(connection, nextState);
        setState(nextState);
        await updateMints(nextState.metadataByMint);
        return [];
    }
    async function pullAuctionPage(auctionAddress) {
        if (isLoading)
            return state;
        if (!storeAddress) {
            if (isReady) {
                setIsLoading(false);
            }
            return state;
        }
        else if (!state.store) {
            setIsLoading(true);
        }
        const nextState = await (0, _1.pullAuctionSubaccounts)(connection, auctionAddress, state);
        setState(nextState);
        await updateMints(nextState.metadataByMint);
        return nextState;
    }
    async function pullAllSiteData() {
        if (isLoading)
            return state;
        if (!storeAddress) {
            if (isReady) {
                setIsLoading(false);
            }
            return state;
        }
        else if (!state.store) {
            setIsLoading(true);
        }
        console.log('------->Query started');
        const nextState = await (0, loadAccounts_1.loadAccounts)(connection);
        console.log('------->Query finished');
        setState(nextState);
        await updateMints(nextState.metadataByMint);
        return;
    }
    async function update(auctionAddress, bidderAddress, userTokenAccounts) {
        if (!storeAddress) {
            if (isReady) {
                //@ts-ignore
                window.loadingData = false;
                setIsLoading(false);
            }
            return;
        }
        else if (!state.store) {
            //@ts-ignore
            window.loadingData = true;
            setIsLoading(true);
        }
        console.log('-----> Query started');
        let nextState = await (0, _1.pullPage)(connection, page, state);
        if (nextState.storeIndexer.length) {
            if (loadAccounts_1.USE_SPEED_RUN) {
                nextState = await (0, loadAccounts_1.limitedLoadAccounts)(connection);
                console.log('------->Query finished');
                setState(nextState);
                //@ts-ignore
                window.loadingData = false;
                setIsLoading(false);
            }
            else {
                console.log('------->Pagination detected, pulling page', page);
                // Ensures we get the latest so beat race conditions and avoid double pulls.
                let currMetadataLoaded = false;
                setMetadataLoaded(loaded => {
                    currMetadataLoaded = loaded;
                    return loaded;
                });
                if (userTokenAccounts &&
                    userTokenAccounts.length &&
                    !currMetadataLoaded) {
                    console.log('--------->User metadata loading now.');
                    setMetadataLoaded(true);
                    nextState = await (0, loadAccounts_1.pullYourMetadata)(connection, userTokenAccounts, nextState);
                }
                const auction = window.location.href.match(/#\/auction\/(\w+)/);
                const billing = window.location.href.match(/#\/auction\/(\w+)\/billing/);
                if (auction && page == 0) {
                    console.log('---------->Loading auction page on initial load, pulling sub accounts');
                    nextState = await (0, _1.pullAuctionSubaccounts)(connection, auction[1], nextState);
                    if (billing) {
                        console.log('-----> Pulling all payout tickets');
                        await (0, _1.pullPayoutTickets)(connection, nextState);
                    }
                }
                let currLastLength;
                setLastLength(last => {
                    currLastLength = last;
                    return last;
                });
                if (nextState.storeIndexer.length != currLastLength) {
                    setPage(page => page + 1);
                }
                setLastLength(nextState.storeIndexer.length);
                //@ts-ignore
                window.loadingData = false;
                setIsLoading(false);
                setState(nextState);
            }
        }
        else {
            console.log('------->No pagination detected');
            nextState = !loadAccounts_1.USE_SPEED_RUN
                ? await (0, loadAccounts_1.loadAccounts)(connection)
                : await (0, loadAccounts_1.limitedLoadAccounts)(connection);
            console.log('------->Query finished');
            setState(nextState);
            //@ts-ignore
            window.loadingData = false;
            setIsLoading(false);
        }
        console.log('------->set finished');
        await updateMints(nextState.metadataByMint);
        if (auctionAddress && bidderAddress) {
            const auctionBidderKey = auctionAddress + '-' + bidderAddress;
            return [
                nextState.auctions[auctionAddress],
                nextState.bidderPotsByAuctionAndBidder[auctionBidderKey],
                nextState.bidderMetadataByAuctionAndBidder[auctionBidderKey],
            ];
        }
    }
    (0, react_1.useEffect)(() => {
        //@ts-ignore
        if (window.loadingData) {
            console.log('currently another update is running, so queue for 3s...');
            const interval = setInterval(() => {
                //@ts-ignore
                if (window.loadingData) {
                    console.log('not running queued update right now, still loading');
                }
                else {
                    console.log('running queued update');
                    update(undefined, undefined, userAccounts);
                    clearInterval(interval);
                }
            }, 3000);
        }
        else {
            console.log('no update is running, updating.');
            update(undefined, undefined, userAccounts);
        }
    }, [
        connection,
        setState,
        updateMints,
        storeAddress,
        isReady,
        page,
        userAccounts.length > 0,
    ]);
    (0, react_1.useEffect)(() => {
        if (isLoading) {
            return;
        }
        return (0, subscribeAccountsChange_1.subscribeAccountsChange)(connection, () => state, setState);
    }, [connection, setState, isLoading, state]);
    // TODO: fetch names dynamically
    // TODO: get names for creators
    // useEffect(() => {
    //   (async () => {
    //     const twitterHandles = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    //      filters: [
    //        {
    //           dataSize: TWITTER_ACCOUNT_LENGTH,
    //        },
    //        {
    //          memcmp: {
    //           offset: VERIFICATION_AUTHORITY_OFFSET,
    //           bytes: TWITTER_VERIFICATION_AUTHORITY.toBase58()
    //          }
    //        }
    //      ]
    //     });
    //     const handles = twitterHandles.map(t => {
    //       const owner = new PublicKey(t.account.data.slice(32, 64));
    //       const name = t.account.data.slice(96, 114).toString();
    //     });
    //     console.log(handles);
    //   })();
    // }, [whitelistedCreatorsByCreator]);
    return (react_1.default.createElement(MetaContext.Provider, { value: {
            ...state,
            // @ts-ignore
            update,
            pullAuctionPage,
            pullAllMetadata,
            pullBillingPage,
            pullAllSiteData,
            isLoading,
        } }, children));
}
exports.MetaProvider = MetaProvider;
const useMeta = () => {
    const context = (0, react_1.useContext)(MetaContext);
    return context;
};
exports.useMeta = useMeta;
//# sourceMappingURL=meta.js.map