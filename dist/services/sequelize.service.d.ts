interface SequelizeService {
    init: () => Promise<void>;
}
declare const sequelizeService: SequelizeService;
export default sequelizeService;
