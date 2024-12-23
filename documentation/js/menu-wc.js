'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-udemy documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' : 'data-bs-target="#xs-controllers-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' :
                                            'id="xs-controllers-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' : 'data-bs-target="#xs-injectables-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' :
                                        'id="xs-injectables-links-module-AppModule-eceb99e25bcaf9c7d3ec53a45466e98388f574481e9b09b1ad97f8497ffddcd6d05879cf1dfe3506d0b06e7488dbb459f488092cfa9910d2928ffa34c712da35"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' :
                                            'id="xs-controllers-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' :
                                        'id="xs-injectables-links-module-AuthModule-4da9d516e400c8bf20ec64cf56ad9bc2f159a47f42389cc68eb10f74875961159a4e910892b6ee3e198efb066a4a4eeb8830eed3d074791f070528db64fe6e00"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SigninProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SigninProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-069ceb502470957e4a1248a1620f361bf9bb3f81350f673ef1184717186e81c6738b5d5bda5c78e3f04950ab9b86a121ae494eb29157398b7c4e29963ccfd885"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-4df906fdb97e2158aad5895fb7e6210c82ed0360afa546d96483627b18672ae2bce54a46c0aa4dab3dc762bb4cb6100e6b282f7a78798bad4bc2a366e73ec240"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-4df906fdb97e2158aad5895fb7e6210c82ed0360afa546d96483627b18672ae2bce54a46c0aa4dab3dc762bb4cb6100e6b282f7a78798bad4bc2a366e73ec240"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-4df906fdb97e2158aad5895fb7e6210c82ed0360afa546d96483627b18672ae2bce54a46c0aa4dab3dc762bb4cb6100e6b282f7a78798bad4bc2a366e73ec240"' :
                                        'id="xs-injectables-links-module-PaginationModule-4df906fdb97e2158aad5895fb7e6210c82ed0360afa546d96483627b18672ae2bce54a46c0aa4dab3dc762bb4cb6100e6b282f7a78798bad4bc2a366e73ec240"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' :
                                            'id="xs-controllers-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' :
                                        'id="xs-injectables-links-module-PostsModule-8aae5302f877e8afced50927255725232a2251398cf3f900f04a519617b2898694312c030d1eb880d17618235bca6fbee72618a5af82dcbf6785452a493b875e"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' :
                                            'id="xs-controllers-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' :
                                        'id="xs-injectables-links-module-TagsModule-f03147e69820516278f9d9f4b0b13ca7708e08a68dc0205ac17eb2d877ae30455f757a9f629d5664ac831e2ee2f1960ac765677ed7b8275538cb0efb46eccf4c"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' :
                                            'id="xs-controllers-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' :
                                        'id="xs-injectables-links-module-UsersModule-1acf2edb49b831a0d4dab5e8d7a7fddcaa0c6053b4ffd2ec636a59ebf898d8c3d21565c91c086e64f9da97a3cb0a6c5134ed15ada5528c0490e28ef69d546299"' }>
                                        <li class="link">
                                            <a href="injectables/FindUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCreateManyProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCreateManyProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCreateProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCreateProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MetaOptionsController.html" data-type="entity-link" >MetaOptionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostBaseDto.html" data-type="entity-link" >GetPostBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostDto.html" data-type="entity-link" >GetPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MetaOptionDto.html" data-type="entity-link" >MetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BryptProvider.html" data-type="entity-link" >BryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindUserByEmailProvider.html" data-type="entity-link" >FindUserByEmailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MetaOptionService.html" data-type="entity-link" >MetaOptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationProvider.html" data-type="entity-link" >PaginationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SigninProvider.html" data-type="entity-link" >SigninProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link" >TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserCreateManyProvider.html" data-type="entity-link" >UserCreateManyProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserCreateProvider.html" data-type="entity-link" >UserCreateProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});