import { useEffect } from 'react';
import { init, getInstance } from 'ts-indexdb';

export type Rack = {
    name: string
    id?: number
};

const Home = () => {

    const initIndexdb = async () => {
        await init({
            dbName: "books",        // 数据库名称               
            version: 1,             // 版本号                
            tables: [
                {
                    tableName: "bookrackList",         // 表名         
                    option: { keyPath: "id", autoIncrement: true }, // 指明主键为id
                    indexs: [    // 数据库索引
                        {
                            key: "id",
                            option: {
                                unique: true
                            }
                        },
                        {
                            key: "name"
                        }
                    ]
                }
            ]
        });

        await getInstance().insert<Rack>({
            tableName: 'bookrackList',
            data: {
                name: '测试',
            }
        });
    }

    const query = async () => {
        const res = await getInstance().queryAll<Rack>({
            tableName: 'bookrackList'
        });
        console.log(res, res.length);
        return res;
    };

    useEffect(() => {
        initIndexdb();
        // query();
    }, []);

    return (
        <div>
            <h2>Home</h2>
            <button onClick={() => {
                throw new Error('test');
            }}>测试</button>
        </div>
    )
}

export default Home;