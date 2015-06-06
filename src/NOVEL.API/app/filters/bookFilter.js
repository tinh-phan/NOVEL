'use strict';
app.filter('bookRangeFilter', function ($filter , $log) {
    return function (books, size) {
        
        if (angular.isArray(books) && angular.isNumber(size)) {
            $log.log(books);
            if (books.length < 0) {
                $log.log('ds rong');
                return [];
            } else {
                $log.log('Chieu dai mang');
                $log.log(books.length);
                
                if (size <= books.length) {
                    $log.log('Tra ve danh sach 1 ');
                    $log.log(books.length);
                    $log.log($filter("limitTo")(books.splice(0), size));
                    return $filter("limitTo")(books.splice(0), size);
                }
                else {
                    $log.log('Tra ve danh sach 2 ');
                    $log.log($filter("limitTo")(books));
                    return $filter("limitTo")(books);
                }
            }
        } else {
            $log.log("Khong phai ds");
            return books;
        }
    }
});