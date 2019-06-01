function sendTicket() {
    var data = {};
    $('#signup').find('input').each(function () {
        if (this.name === "phone")
            data[this.name] = String($(this).val()).split('').filter(x => Number(x) + 1 && x !== ' ').join('');
        else
            data[this.name] = $(this).val();
    });
    $.ajax({
        url: '/api/ticket',
        type: 'post',
        data: data,
        success: function () {
            alert('заявка была отправлена успешно');
        },
        error: function () {
            alert('ошибка, повторите отправку заявки');
        }
    });
}