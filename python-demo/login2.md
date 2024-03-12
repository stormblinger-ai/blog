# 2. 设计数据模型

​      

------

使用Django开发Web应用的过程中，很多人都是急急忙忙地写视图，写前端页面，把最根本的模型设计给忽略了。模型中定义了数据如何在数据库内保存，也就是数据表的定义方式。这部分工作体现在Django的代码中，其实就是model类的设计。

## 一、 数据库模型设计

作为一个用户登录和注册项目，需要保存的都是各种用户的相关信息。很显然，我们至少需要一张用户表User，在用户表里需要保存下面的信息：

- 用户名
- 密码
- 邮箱地址
- 性别
- 创建时间

我们现在就暂定保存这些信息吧，更多的内容，请大家在实际项目中自行添加。

进入`login/models.py`文件，这里将是我们整个login应用中所有模型的存放地点，代码如下：

```
from django.db import models

# Create your models here.


class User(models.Model):

    gender = (
        ('male', "男"),
        ('female', "女"),
    )

    name = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=256)
    email = models.EmailField(unique=True)
    sex = models.CharField(max_length=32, choices=gender, default="男")
    c_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-c_time"]
        verbose_name = "用户"
        verbose_name_plural = "用户"
```

各字段含义：

- name: 必填，最长不超过128个字符，并且唯一，也就是不能有相同姓名；
- password: 必填，最长不超过256个字符（实际可能不需要这么长）；
- email: 使用Django内置的邮箱类型，并且唯一；
- sex: 性别，使用了一个choice，只能选择男或者女，默认为男；
- 使用`__str__`方法帮助人性化显示对象信息；
- 元数据里定义用户按创建时间的反序排列，也就是最近的最先显示；

注意：这里的用户名指的是网络上注册的用户名，不要等同于现实中的真实姓名，所以采用了唯一机制。如果是现实中的人名，那是可以重复的，肯定是不能设置unique的。另外关于密码，建议至少128位长度，原因后面解释。

## 二、 设置数据库后端

定义好了模型后，就必须选择我们用来保存数据的数据库系统。Django支持Mysql，SQLite，Oracle等等。

Django中对数据库的设置在settings文件中，如下部分：

```
# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

Django默认使用SQLite数据库，并内置SQLite数据库的访问API，也就是说和Python一样原生支持SQLite。本项目使用SQLite作为后端数据库，因此不需要修改settings中这部分内容。如果你想要使用别的数据库，请自行修改该部分设置。

## 三、注册app

每次创建了新的app后，都需要在全局settings中注册，这样Django才知道你有新的应用上线了。在settings的下面部分添加‘login’，建议在最后添加个逗号。

```
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'login',
]
```

## 四、创建记录和数据表

app中的models建立好了后，并不会自动地在数据库中生成相应的数据表，需要你手动创建。

进入Pycharm的terminal终端，执行下面的命令：

```
python manage.py makemigrations
```

返回结果：

```
(venv) D:\work\2019\for_test\mysite>python manage.py makemigrations
Migrations for 'login':
  login\migrations\0001_initial.py
    - Create model User
```

Django自动为我们创建了`login\migrations\0001_initial.py`文件，保存了我们的第一次数据迁移工作，也就是创建了User模型。

接着执行下面的命令：

```
python manage.py migrate
```

Django将在数据库内创建真实的数据表。如果是第一次执行该命令，那么一些内置的框架，比如auth、session等的数据表也将被一同创建，如下所示：

```
(venv) D:\work\2019\for_test\mysite>python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, login, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying login.0001_initial... OK
  Applying sessions.0001_initial... OK
```