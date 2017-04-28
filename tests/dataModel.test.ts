/// <reference path="../typings/globals/jest/index.d.ts" />

import {DataModel} from "../src/model/dataModel";
import {XlsxConverter} from "../src/server/xlsxConverter";

describe("DataModel test suite", () => {

    let dataModel: DataModel;

    it ("Get column titles", () => {

        let jsonObject = new XlsxConverter().getJson("./tests/data/Xlsx/Analytics-data.xls");
        let str = JSON.stringify(jsonObject);

        dataModel = new DataModel(str);
        let titles = dataModel.getTitles();

        expect(titles).not.toBeNull();
        expect(titles.length).toEqual(11);
    })

})
